import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { mdmajors } from 'src/app/models/mdmajors';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { MessageService } from 'src/app/services/message.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { InputText } from 'src/app/models/inputtext';
import { InputControlService } from 'src/app/services/input-control.service';
import { EditmdmajorsComponent } from './editmdmajors/editmdmajors.component';
import { MdmajorsService } from 'src/app/services/mdmajors.service';
@Component({
  selector: 'app-chuyennganh',
  templateUrl: './chuyennganh.component.html',
  styleUrls: ['./chuyennganh.component.css']
})
export class ChuyennganhComponent implements OnInit, AfterViewInit {
  arr_mdmajors: mdmajors[] = [];
  dataSource = new MatTableDataSource<mdmajors>(this.arr_mdmajors);
  loading$ = false;
  name_filter = '';
  arr_temp: { key: string, value: string }[] = [];
  arr_filter: Inputbase<string>[] = [];
  displayedColumns: string[] = ['select', 'majorscode', 'majorsname', 'description', 'action'];
  displayedColumns2: string[] = ['cot1', 'majorscode_filter', 'majorsname_filter', 'description_filter', 'cot6'];
  selection = new SelectionModel<mdmajors>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  formfilter!: FormGroup;
  filter_object = {
    majorscode: '',
    majorsname: '',
    description: ''
  }
  constructor(private dialog: MatDialog, private mdmajorsSrv: MdmajorsService, private controlSrv: InputControlService,private messSrv: MessageService,) {

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.get_data();
    this.mdmajorsSrv.f5_service().subscribe(t => {
      this.get_data();
    });
  }
  get_data() {
    this.arr_mdmajors = [];
    this.mdmajorsSrv.get_list().subscribe(t => {
      this.arr_mdmajors = t;
      this.set_filter();
      this.dataSource = new MatTableDataSource<mdmajors>(this.arr_mdmajors);
      this.dataSource.filterPredicate = this.createFilter();
      this.dataSource.paginator = this.paginator;
      this.onchange();
    });
  }



  set_filter() {
    this.set_data();
    this.formfilter = this.controlSrv.toFormGroup(this.arr_filter as Inputbase<string>[]);
  }

  set_data() {
    let arr_status = [{ key: 'true', value: 'Kích hoạt' }, { key: 'false', value: 'Huỷ kích hoạt' }];
    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'mdmajorscode',
        label: '',
        value: '',
        required: false,
        order: 1
      }),
      new InputText({
        key: 'mdmajorsname',
        label: '',
        value: '',
        required: false,
        order: 2
      }),
      new InputText({
        key: 'description',
        label: '',
        value: '',
        required: false,
        order: 4
      }),
      new InputDropdown({
        key: 'isactive',
        label: '',
        options: arr_status,
        value: '',
        order: 5
      }),
    ];
    this.arr_filter = dataIP;
  }

  onchange() {
    this.formfilter.valueChanges.subscribe(val => {
      this.dataSource.filter = JSON.stringify(val);
      this.dataSource.paginator = this.paginator;
    });
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  showXoaDialog(id: any) {
    if (id == '') {
      let arr_select = this.selection.selected;
      if (arr_select.length == 0) {
        this.messSrv.error('Bạn chưa chọn bản ghi nào');
        return;
      }
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "390px";
    dialogConfig.panelClass = "pd_dialog_none";
    dialogConfig.data = "Bạn chắc chắn muốn xoá bản ghi này?";
    this.dialog.open(AlertComponent, dialogConfig).afterClosed().subscribe(
      res => {
        if (res) {
          if (id != '') {
            this.xoa_obj(id);
          } else {
            this.Xoa_arr();
          }
        }
      }
    );
  }

  xoa_obj(id: string) {
    let arrID = JSON.parse("[" + id + "]");
    this.mdmajorsSrv.delete_arr(arrID).subscribe(t => {
      if (t.data) {
        this.messSrv.success('Bạn đã thực hiện thành công!');
        this.selection.clear();
      } else {
        this.messSrv.error('Có lỗi trong quá trình lưu dữ liệu');
      }
    });
  }

  Xoa_arr() {
    let arrID = this.selection.selected.map(t => t.id);
    this.mdmajorsSrv.delete_arr(arrID).subscribe(t => {
      if (t.data) {
        this.messSrv.success('Bạn đã thực hiện thành công!');
        this.selection.clear();
      } else {
        this.messSrv.error('Có lỗi trong quá trình lưu dữ liệu');
      }
    });
  }

  sua_item(gt: mdmajors) {
    let data: mdmajors = {
      id: gt.id,
      majorscode: gt.majorscode,
      majorsname: gt.majorsname,
      description: gt.description
    };
    this.showEditDialog(data);
  }

  showEditDialog(data: mdmajors) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "520px";
    dialogConfig.panelClass = "pd_dialog_none";
    dialogConfig.data = data;
    dialogConfig.disableClose = true;
    this.dialog.open(EditmdmajorsComponent, dialogConfig).afterClosed().subscribe(
      res => {
        if (res != null && res != '' && res != undefined) {

        }
      }
    );
  }

  applyFilter(name_filter: string, gt: any) {
    let name_tmp = name_filter.split('_')[0];
    if (name_tmp === 'majorscode') {
      this.filter_object.majorscode = gt.value;
    }
    if (name_tmp === 'majorsname') {
      this.filter_object.majorsname = gt.value;
    }
    if (name_tmp === 'description') {
      this.filter_object.description = gt.value;
    }
    this.dataSource.filter = JSON.stringify(this.filter_object);
    this.dataSource.paginator = this.paginator;
  }
  reload_grid() {

  }
  them_moi() {
    let tmp: mdmajors = {
      id: 0,
      majorscode: '',
      majorsname: '',
      description: ''
    };
    this.showEditDialog(tmp);
  }
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (searchTerms[col].toString() !== '') {
          isFilterSet = true;
        } else {
          delete searchTerms[col];
        }
      }

      let nameSearch = () => {
        if (isFilterSet) {
          let arr: boolean[] = [];
          let found = false;
          for (const col in searchTerms) {

            let filter_str = data[col] || '';
            if (filter_str.toString().toLowerCase().indexOf(searchTerms[col].trim().toLowerCase()) != -1 && isFilterSet) {
              found = true
            } else {
              found = false;
            }
            arr.push(found);
          }
          let count_array = arr.findIndex(t => t == false);
          arr = [];
          return count_array == -1 ? true : false;
        } else {
          return true;
        }
      }
      return nameSearch();
    }
    return filterFunction;
  }


}
