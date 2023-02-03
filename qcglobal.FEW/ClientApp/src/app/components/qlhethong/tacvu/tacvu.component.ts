import { functions } from 'src/app/models/functions';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { permission } from 'src/app/models/permission';
import { FunctionService } from 'src/app/services/function.service';
import { InputControlService } from 'src/app/services/input-control.service';
import { MessageService } from 'src/app/services/message.service';
import { PermissionService } from 'src/app/services/permission.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { EditsysPermissionComponent } from './editsys-permission/editsys-permission.component';

@Component({
  selector: 'app-tacvu',
  templateUrl: './tacvu.component.html',
  styleUrls: ['./tacvu.component.css']
})
export class TacvuComponent implements OnInit, AfterViewInit {
  arr_sysfunction: permission[] = [];
  dataSource = new MatTableDataSource<permission>(this.arr_sysfunction);
  loading$ = false;
  name_filter = '';
  arr_function: { key: string, value: string }[] = [];
  displayedColumns: string[] = ['select', 'name','functionid', 'description','active', 'action'];
  displayedColumns2: string[] = ['cot1', 'name_filter','functionid_filter', 'description_filter','active_filter','cot6'];
  selection = new SelectionModel<permission>(true, []);
  arr_filter: Inputbase<string>[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  formfilter!: FormGroup;
  filter_object = {
    name: '',
    functionid: 0,
    description: '',
    active: 0
  }
  constructor(private dialog: MatDialog, private functionSrv: FunctionService, private permissionSrv: PermissionService, private controlSrv: InputControlService, private messSrv: MessageService,) {

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.get_data();
    this.permissionSrv.f5_service().subscribe(t => {
      this.get_data();
    });
  }
  get_data() {
    this.arr_sysfunction = [];
    this.permissionSrv.get_list().subscribe(t => {
      this.arr_sysfunction = t;

      this.functionSrv.get_list().subscribe(functions => {
        this.arr_function = functions.map(({ id, name }) => {
          let tmp1: { key: string, value: string } = {
            key: '',
            value: ''
          };
          tmp1.key = id.toString();
          tmp1.value = name;
          return tmp1;
        })

        this.set_filter();
        this.dataSource = new MatTableDataSource<permission>(this.arr_sysfunction);
        this.dataSource.filterPredicate = this.createFilter();
        this.dataSource.paginator = this.paginator;
        this.onchange();
      });
    });
  }

  get_parentFunction(id_parent: number) {
    let gt = '';
    let index = this.arr_function.findIndex(t => t.key == id_parent.toString());
    if (index !== -1) {
      gt = this.arr_function[index].value;
    }
    return gt;
  }

  set_filter() {
    this.set_data();
    this.formfilter = this.controlSrv.toFormGroup(this.arr_filter as Inputbase<string>[]);
  }

  set_data() {
    let arr_status = [{  key: '1', value: 'Kích hoạt' }, { key: '0', value: 'Huỷ kích hoạt' }];
    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'name',
        label: '',
        value: '',
        required: false,
        order: 1
      }),
      new InputDropdown({
        key: 'functionid',
        label: '',
        options: this.arr_function,
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
        key: 'active',
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
    this.permissionSrv.delete_arr(arrID).subscribe(t => {
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
    this.permissionSrv.delete_arr(arrID).subscribe(t => {
      if (t.data) {
        this.messSrv.success('Bạn đã thực hiện thành công!');
        this.selection.clear();
      } else {
        this.messSrv.error('Có lỗi trong quá trình lưu dữ liệu');
      }
    });
  }

  sua_item(gt: permission) {
    let data: permission = {
      id: gt.id,
      functionid: gt.functionid,
      name: gt.name,
      description: gt.description,
      active: gt.active,
      list_function: this.arr_function,
    };
    this.showEditDialog(data);
  }

  showEditDialog(data: permission) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "520px";
    dialogConfig.panelClass = "pd_dialog_none";
    dialogConfig.data = data;
    dialogConfig.disableClose = true;
    this.dialog.open(EditsysPermissionComponent, dialogConfig).afterClosed().subscribe(
      res => {
        if (res != null && res != '' && res != undefined) {

        }
      }
    );
  }

  applyFilter(name_filter: string, gt: any) {
    let name_tmp = name_filter.split('_')[0];
    if (name_tmp === 'name') {
      this.filter_object.name = gt.value;
    }
    if (name_tmp === 'functionid') {
      this.filter_object.functionid = gt.value;
    }
    if (name_tmp === 'description') {
      this.filter_object.description = gt.value;
    }
    if (name_tmp === 'active') {
      this.filter_object.active = gt.value;
    }
    this.dataSource.filter = JSON.stringify(this.filter_object);
    this.dataSource.paginator = this.paginator;
  }
  reload_grid() {

  }

  them_moi() {
    let tmp: permission = {
      name: '',
      description: '',
      active: 1,
      functionid: 0,
      id: 0,
      list_function: this.arr_function,
    };
    this.showEditDialog(tmp);
  }
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (col !== 'active' && col !== 'functionid') {
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
            if (col !== 'active' && col !== 'functionid') {
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
