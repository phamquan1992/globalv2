import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { employee } from 'src/app/models/employee';
import { Inputbase } from 'src/app/models/input-base';
// import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { InputControlService } from 'src/app/services/input-control.service';

@Component({
  selector: 'app-nhanvien',
  templateUrl: './nhanvien.component.html',
  styleUrls: ['./nhanvien.component.css']
})
export class NhanvienComponent  implements OnInit, AfterViewInit {
  arr_employee: employee[] = [];
  dataSource = new MatTableDataSource<employee>(this.arr_employee);
  loading$ = false;
  name_filter = '';
  displayedColumns: string[] = ['select', 'employeecode', 'employeename','branchname','tel','address','status','action'];
  displayedColumns2: string[] = ['cot1', 'employeecode_filter', 'employeename_filter','branchname_filter',
  'tel_filter', 'address_filter', 'status_filter','cot6'];
  selection = new SelectionModel<employee>(true, []);
  arr_filter: Inputbase<string>[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  formfilter!: FormGroup;
  filter_object = {
    employeecode: '',
    employeename: '',
    branchname: 1,
    tel: '',
    address: '',
    status: true
  }
  constructor(private dialog: MatDialog, private controlSrv: InputControlService) {

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    const group: any = {};
    // this.displayedColumns2.forEach(it => {
    //   group[it] = new FormControl('');
    // });
    // this.formfilter = new FormGroup(group);
    this.set_data();
    this.formfilter = this.controlSrv.toFormGroup(this.arr_filter as Inputbase<string>[]);
    this.get_data();
    this.dataSource.filterPredicate = this.createFilter();
    this.onchange();
  }
  get_data() {
    this.arr_employee = [];
    for (let index = 0; index < 50; index++) {
      let item: employee = {
        employeecode: 'ma nhan vien' + (index + 1),
        employeename: 'ten nhan vien' + (index + 1),
        branchname: 'cong ty 1',
        tel: "0366883928",
        address: 'dia chi' + (index + 1),
        status: true,
        id: 0
      };
      this.arr_employee.push(item);
    }
    this.dataSource = new MatTableDataSource<employee>(this.arr_employee);
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
  sua_item(gt: employee) {
    let data: employee = {
      employeecode: gt.employeecode,
      employeename: gt.employeename,
      address: gt.address,
      id: gt.id
    };
    this.showEditDialog(data);
  }
  showEditDialog(data: employee) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "520px";
    dialogConfig.panelClass = "pd_dialog_none";
    dialogConfig.data = data;
    dialogConfig.disableClose = true;
    // this.dialog.open(EditemployeeComponent, dialogConfig).afterClosed().subscribe(
    //   res => {
    //     if (res != null && res != '' && res != undefined) {

    //     }
    //   }
    // );
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
      this.filter_object.employeecode = gt.value;
    }
    if (name_tmp === 'name') {
      this.filter_object.employeename = gt.value;
    }
    if (name_tmp === 'branchname') {
      this.filter_object.branchname = gt.value;
    }
    if (name_tmp === 'tel') {
      this.filter_object.tel = gt.value;
    }
    if (name_tmp === 'address') {
      this.filter_object.address = gt.value;
    }
    if (name_tmp === 'status') {
      this.filter_object.address = gt.value;
    }
    this.dataSource.filter = JSON.stringify(this.filter_object);
    this.dataSource.paginator = this.paginator;
  }
  reload_grid() {

  }
  them_moi() {

  }
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);

      let isFilterSet = false;
      for (const col in searchTerms) {
        if (col !== 'status' && col !== 'levelion') {
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
            if (col !== 'status' && col !== 'levelion') {
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
    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'employeecode',
        label: '',
        value: '',
        required: false,
        order: 1
      }),
      new InputText({
        key: 'employeename',
        label: '',
        value: '',
        required: false,
        order: 2
      }),
      new InputText({
        key: 'branchname',
        label: '',
        value: '',
        required: false,
        order: 2
      }),
      new InputText({
        key: 'tel',
        label: '',
        value: '',
        required: false,
        order: 2
      }),
      new InputText({
        key: 'address',
        label: '',
        value: '',
        required: false,
        order: 2
      }),
      new InputText({
        key: 'status',
        label: '',
        value: '',
        required: false,
        order: 2
      }),
    ];
    this.arr_filter = dataIP;
  }

}
