import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { qc_title, qctitle_edit } from 'src/app/models/qc_title';
import { EditchucvuComponent } from './editchucvu/editchucvu.component';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { MessageService } from 'src/app/services/message.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { InputText } from 'src/app/models/inputtext';
import { InputControlService } from 'src/app/services/input-control.service';
import { DepartmentService } from 'src/app/services/department.service';
import { QcTitleService } from 'src/app/services/qctitle.service';

@Component({
  selector: 'app-chucvu',
  templateUrl: './chucvu.component.html',
  styleUrls: ['./chucvu.component.css']
})
export class ChucvuComponent implements OnInit, AfterViewInit {
  arr_tilte: qc_title[] = [];
  dataSource = new MatTableDataSource<qc_title>(this.arr_tilte);
  loading$ = false;
  name_filter = '';
  displayedColumns: string[] = ['select', 'titlecode', 'titlename', 'departmentid', 'description', 'isactive', 'action'];
  displayedColumns2: string[] = ['cot1', 'titlecode_filter', 'titlename_filter', 'departmentid_filter', 'description_filter', 'isactive_filter', 'cot6'];
  selection = new SelectionModel<qc_title>(true, []);
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  formfilter!: FormGroup;
  arr_temp: { key: string, value: string }[] = [];
  arr_filter: Inputbase<string>[] = [];

  constructor(private dialog: MatDialog, private departmentSrv: DepartmentService, private qctitleSrv: QcTitleService, private controlSrv: InputControlService, private messSrv: MessageService,) {

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.get_data();
    this.qctitleSrv.f5_service().subscribe(t => {
      this.get_data();
    });
  }
  get_data() {
    this.arr_tilte = [];
    this.qctitleSrv.get_list().subscribe(t => {
      this.arr_tilte = t;
      this.departmentSrv.get_list().subscribe(t1 => {
        this.arr_temp = t1.map(({ id, departmentname }) => {
          let tmp: { key: string, value: string } = {
            key: '',
            value: ''
          };
          tmp.key = id.toString();
          tmp.value = departmentname;
          return tmp;
        });
        this.set_filter();
        this.dataSource = new MatTableDataSource<qc_title>(this.arr_tilte);
        this.dataSource.filterPredicate = this.createFilter();
        this.dataSource.paginator = this.paginator;
        this.onchange();
      });

    });
  }

  get_parent(id_parent: number) {
    let gt = '';
    let index = this.arr_temp.findIndex(t => t.key == id_parent.toString());
    if (index !== -1) {
      gt = this.arr_temp[index].value;
    }
    return gt;
  }

  onchange() {
    this.formfilter.valueChanges.subscribe(val => {
      this.dataSource.filter = JSON.stringify(val);
      this.dataSource.paginator = this.paginator;
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
        key: 'titlecode',
        label: '',
        value: '',
        required: false,
        order: 1
      }),
      new InputText({
        key: 'titlename',
        label: '',
        value: '',
        required: false,
        order: 2
      }),
      new InputDropdown({
        key: 'departmentid',
        label: '',
        options: this.arr_temp,
        value: '',
        order: 3
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
  sua_item(gt: qc_title) {
    let data: qc_title = {
      id: gt.id,
      titlecode: gt.titlecode,
      titlename: gt.titlename,
      description: gt.description,
      departmentid: gt.departmentid,
      isactive: gt.isactive
    };
    this.showEditDialog(data);
  }

  showhide(gt: boolean) {
    if (this.selection.selected.length == 0) {
      this.messSrv.error('Bạn chưa chọn bản ghi nào');
      return;
    }
    this.selection.selected.forEach(element => {
      element.isactive = gt;
    });
    this.qctitleSrv.update_status(this.selection.selected).subscribe(
      t => {
        if (t) {
          this.messSrv.success('Bạn đã thực hiện thành công!');
          this.selection.clear();
        } else {
          this.messSrv.error('Có lỗi trong quá trình lưu dữ liệu');
        }
      }
    );
  }

  showEditDialog(data: qc_title) {
    let edit_value: qctitle_edit = {
      obj_edit: data,
      list_department: this.arr_temp
    };
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "520px";
    dialogConfig.panelClass = "pd_dialog_none";
    dialogConfig.data = edit_value;
    dialogConfig.disableClose = true;
    this.dialog.open(EditchucvuComponent, dialogConfig).afterClosed().subscribe(
      res => {
        if (res != null && res != '' && res != undefined) {

        }
      }
    );
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
    this.qctitleSrv.delete_arr(arrID).subscribe(t => {
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
    this.qctitleSrv.delete_arr(arrID).subscribe(t => {
      if (t.data) {
        this.messSrv.success('Bạn đã thực hiện thành công!');
        this.selection.clear();
      } else {
        this.messSrv.error('Có lỗi trong quá trình lưu dữ liệu');
      }
    });
  }

  applyFilter(name_filter: string, gt: any) {

  }
  reload_grid() {

  }
  them_moi() {
    let tmp: qc_title = {
      id: 0,
      titlecode: '',
      titlename: '',
      departmentid: 0,
      description: '',
      isactive: false

    };
    this.showEditDialog(tmp);
  }
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (col !== 'departmentid' && col !== 'isactive') {
          if (searchTerms[col].toString() !== '') {
            isFilterSet = true;
          } else {
            delete searchTerms[col];
          }
        } else {
          if (searchTerms[col]['key'] !== undefined) {
            if (searchTerms[col]['key'].toString() !== '') {
              isFilterSet = true;
            } else {
              delete searchTerms[col];
            }
          } else {
            delete searchTerms[col];
          }
        }
      }

      let nameSearch = () => {
        if (isFilterSet) {
          let arr: boolean[] = [];
          let found = false;
          for (const col in searchTerms) {
            if (col !== 'departmentid' && col !== 'isactive') {
              let filter_str = data[col] || '';
              if (filter_str.toString().toLowerCase().indexOf(searchTerms[col].trim().toLowerCase()) != -1 && isFilterSet) {
                found = true
              } else {
                found = false;
              }
              arr.push(found);
            }
            else {
              let filter2 = data[col] == null ? '' : data[col].toString();
              if (searchTerms[col]['key'].toString() !== 'all' && isFilterSet) {
                if (filter2 == searchTerms[col]['key'].toString()) {
                  found = true
                } else {
                  found = false
                }
              }
              else {
                found = true;
              }
              arr.push(found);
            }
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
