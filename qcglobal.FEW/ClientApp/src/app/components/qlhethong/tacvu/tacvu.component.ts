
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { sys_permission } from 'src/app/models/sys_permission';
import { InputControlService } from 'src/app/services/input-control.service';
import { EditsysPermissionComponent } from './editsys-permission/editsys-permission.component';

@Component({
  selector: 'app-tacvu',
  templateUrl: './tacvu.component.html',
  styleUrls: ['./tacvu.component.css']
})
export class TacvuComponent implements OnInit, AfterViewInit {
  arr_sysfunction: sys_permission[] = [];
  dataSource = new MatTableDataSource<sys_permission>(this.arr_sysfunction);
  loading$ = false;
  name_filter = '';
  displayedColumns: string[] = ['select', 'code', 'name','description','categorypermissionid','functionid', 'action'];
  displayedColumns2: string[] = ['cot1', 'code_filter', 'name_filter','description_filter','categorypermissionid_filter','functionid_filter','cot6'];
  selection = new SelectionModel<sys_permission>(true, []);
  arr_filter: Inputbase<string>[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  formfilter!: FormGroup;
  filter_object = {
    code: '',
    name: '',
    description: '',
    categorypermissionid: 1,
    functionid: 1
  }
  constructor(private dialog: MatDialog, private controlSrv: InputControlService) {

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    const group: any = {};
    this.set_data();
    this.formfilter = this.controlSrv.toFormGroup(this.arr_filter as Inputbase<string>[]);
    this.get_data();
    this.dataSource.filterPredicate = this.createFilter();
    this.onchange();
  }
  get_data() {
    this.arr_sysfunction = [];
    for (let index = 0; index < 50; index++) {
      let item: sys_permission = {
        code: 'mã tác vụ ' + (index + 1),
        name: 'tên tác vụ ' + (index + 1),
        description: 'mô tả ' + (index + 1),
        categorypermissionid: 1,
        functionid: 1,
        id: 0
      };
      this.arr_sysfunction.push(item);
    }
    this.dataSource = new MatTableDataSource<sys_permission>(this.arr_sysfunction);
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

  }
  sua_item(gt: sys_permission) {
    let data: sys_permission = {
      code: gt.code,
      name: gt.name,
      id: gt.id,
      categorypermissionid: gt.categorypermissionid,
      functionid: gt.functionid
    };
    this.showEditDialog(data);
  }
  showEditDialog(data: sys_permission) {
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
  onchange() {
    this.formfilter.valueChanges.subscribe(val => {
      this.dataSource.filter = JSON.stringify(val);
      this.dataSource.paginator = this.paginator;
    });
  }
  applyFilter(name_filter: string, gt: any) {
    let name_tmp = name_filter.split('_')[0];
    if (name_tmp === 'code') {
      this.filter_object.code = gt.value;
    }
    if (name_tmp === 'name') {
      this.filter_object.name = gt.value;
    }
    if (name_tmp === 'description') {
      this.filter_object.name = gt.value;
    }
    if (name_tmp === 'categorypermissionid') {
      this.filter_object.name = gt.value;
    }
    if (name_tmp === 'functionid') {
      this.filter_object.name = gt.value;
    }
    this.dataSource.filter = JSON.stringify(this.filter_object);
    this.dataSource.paginator = this.paginator;
  }
  reload_grid() {

  }
  them_moi() {
    let tmp: sys_permission = {
      code: '',
      name: '',
      id: 0,
      categorypermissionid: 0,
      functionid: 0,
      description: ''
    };
    this.showEditDialog(tmp);
  }
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);

      let isFilterSet = false;
      for (const col in searchTerms) {
        if (col !== 'categorypermissionid' && col !== 'functionid') {
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
            if (col !== 'categorypermissionid' && col !== 'functionid') {
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
  arr_permissioncate = [{ key: '1', value: 'nhom 1' }, { key: '2', value: 'nhom 2' }, { key: '3', value: 'nhom 3' }];
  arr_function = [{ key: '1', value: 'chuc nang 1' }, { key: '2', value: 'chuc nang 2' }];
  set_data() {
    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'code',
        label: '',
        value: '',
        required: false,
        order: 1
      }),
      new InputText({
        key: 'name',
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
        order: 3
      }),
      new InputDropdown({
        key: 'categorypermissionid',
        label: '',
        options: this.arr_permissioncate,
        value: '',
        order: 4
      }),
      new InputDropdown({
        key: 'categorypermissionid',
        label: '',
        options: this.arr_function,
        value: '',
        order: 4
      }),
    ];
    this.arr_filter = dataIP;
  }

}

