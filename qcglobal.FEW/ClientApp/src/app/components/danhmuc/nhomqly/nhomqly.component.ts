import { mdteamsService } from './../../../services/mdteams.service';
import { EditteamComponent } from './editteam/editteam.component';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Inputbase } from 'src/app/models/input-base';
import { InputText } from 'src/app/models/inputtext';
import { InputControlService } from 'src/app/services/input-control.service';
import { mdteams } from 'src/app/models/mdteams';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { MessageService } from 'src/app/services/message.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';

@Component({
  selector: 'app-nhomqly',
  templateUrl: './nhomqly.component.html',
  styleUrls: ['./nhomqly.component.css']
})
export class NhomqlyComponent implements OnInit, AfterViewInit {
  arr_mdteams: mdteams[] = [];
  dataSource = new MatTableDataSource<mdteams>(this.arr_mdteams);
  loading$ = false;
  name_filter = '';
  displayedColumns: string[] = ['select', 'teamcode', 'teamname', 'description', 'isactive', 'action'];
  displayedColumns2: string[] = ['cot1', 'teamcode_filter', 'teamname_filter', 'description_filter','isactive_filter','cot6'];
  selection = new SelectionModel<mdteams>(true, []);
  arr_filter: Inputbase<string>[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  formfilter!: FormGroup;
  filter_object = {
    teamcode: '',
    teamname: '',
    description: ''
  }
  constructor(private dialog: MatDialog,private mdteamsService: mdteamsService, private controlSrv: InputControlService, private messSrv: MessageService,) {

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.get_data();
    this.mdteamsService.f5_service().subscribe(t => {
      this.get_data();
    });
  }
  get_data() {
    this.arr_mdteams = [];
    this.mdteamsService.get_list().subscribe(t => {
      this.arr_mdteams = t;
      this.set_filter();
      this.dataSource = new MatTableDataSource<mdteams>(this.arr_mdteams);
      this.dataSource.filterPredicate = this.createFilter();
      this.dataSource.paginator = this.paginator;
      this.onchange();
    });
  }

  set_filter() {
    this.set_data();
    this.formfilter = this.controlSrv.toFormGroup(this.arr_filter as Inputbase<string>[]);
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
    this.mdteamsService.delete_arr(arrID).subscribe(t => {
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
    this.mdteamsService.delete_arr(arrID).subscribe(t => {
      if (t.data) {
        this.messSrv.success('Bạn đã thực hiện thành công!');
        this.selection.clear();
      } else {
        this.messSrv.error('Có lỗi trong quá trình lưu dữ liệu');
      }
    });
  }

  sua_item(gt: mdteams) {
    let data: mdteams = {
      teamcode: gt.teamcode,
      teamname: gt.teamname,
      description: gt.description,
      isactive: gt.isactive,
      id: gt.id
    };
    this.showEditDialog(data);
  }
  showEditDialog(data: mdteams) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "520px";
    dialogConfig.panelClass = "pd_dialog_none";
    dialogConfig.data = data;
    dialogConfig.disableClose = true;
    this.dialog.open(EditteamComponent, dialogConfig).afterClosed().subscribe(
      res => {
        if (res != null && res != '' && res != undefined) {

        }
      }
    );
  }
  onchange() {
    this.formfilter.valueChanges.subscribe(val => {
      this.dataSource.filter = JSON.stringify(val);
      this.dataSource.paginator = this.paginator;
    });
  }
  applyFilter(name_filter: string, gt: any) {
    let name_tmp = name_filter.split('_')[0];
    if (name_tmp === 'code') {
      this.filter_object.teamcode = gt.value;
    }
    if (name_tmp === 'name') {
      this.filter_object.teamname = gt.value;
    }
    if (name_tmp === 'status') {
      this.filter_object.description = gt.value;
    }
    this.dataSource.filter = JSON.stringify(this.filter_object);
    this.dataSource.paginator = this.paginator;
  }
  reload_grid() {

  }
  them_moi() {
    let tmp: mdteams = {
      id: 0,
      teamcode: '',
      teamname: '',
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
        if (col !== 'isactive') {
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
            if (col !== 'isactive') {
              let filter_str = data[col] || '';
              if (filter_str.toString().toLowerCase().indexOf(searchTerms[col].trim().toLowerCase()) != -1 && isFilterSet) {
                found = true
              } else {
                found = false;
              }
              arr.push(found);
            }
            else {
              let filter2 = data[col].toString() || '';
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
  arr_status = [{ key: '1', value: 'Kích hoạt' }, { key: '0', value: 'Huỷ kích hoạt' }];
  arr_level = [{ key: '1', value: 'Tỉnh' }, { key: '2', value: 'Huyện' }, { key: '3', value: 'Xã' }];
  set_data() {
    let arr_status = [{ key: 'true', value: 'Kích hoạt' }, { key: 'false', value: 'Huỷ kích hoạt' }];
    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'teamcode',
        label: '',
        value: '',
        required: false,
        order: 1
      }),
      new InputText({
        key: 'teamname',
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
        order: 2
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

}
