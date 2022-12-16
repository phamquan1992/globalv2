import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { mdcustomer } from 'src/app/models/mdcustomer';
import { InputControlService } from 'src/app/services/input-control.service';
import { EditdataComponent } from './editdata/editdata.component';

@Component({
  selector: 'app-nhapdulieu',
  templateUrl: './nhapdulieu.component.html',
  styleUrls: ['./nhapdulieu.component.css']
})
export class NhapdulieuComponent implements OnInit, AfterViewInit {
  arr_mdmajors: mdcustomer[] = [];
  dataSource = new MatTableDataSource<mdcustomer>(this.arr_mdmajors);
  loading$ = false;
  name_filter = '';
  displayedColumns: string[] = ['select', 'objectcode', 'objectname', 'taxcode', 'address', 'action'];
  displayedColumns2: string[] = ['cot1', 'objectcode_filter', 'objectname_filter', 'taxcode_filter', 'address_filter', 'cot6'];
  selection = new SelectionModel<mdcustomer>(true, []);
  arr_filter: Inputbase<string>[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  formfilter!: FormGroup;
  filter_object = {
    code: '',
    name: '',
    status: '',
    levelion: 0
  }
  constructor(private dialog: MatDialog, private controlSrv: InputControlService) {

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.set_data();
    this.formfilter = this.controlSrv.toFormGroup(this.arr_filter as Inputbase<string>[]);
    this.get_data();
    this.dataSource.filterPredicate = this.createFilter();
    this.onchange();
  }
  get_data() {
    this.arr_mdmajors = [];
    for (let index = 0; index < 50; index++) {
      let item: mdcustomer = {
        id: (index + 1),
        objectcode: 'KH' + (index + 1),
        objectname: 'Khách hàng ' + (index + 1),
        taxcode: (index + 1).toString(3),
        address: 'Địa chỉ khách hàng ' + (index + 1),
      };
      this.arr_mdmajors.push(item);
    }
    this.dataSource = new MatTableDataSource<mdcustomer>(this.arr_mdmajors);
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
  sua_item(gt: mdcustomer) {
    let data: mdcustomer = {
      id: gt.id,
      objectcode: gt.objectcode,
      objectname: gt.objectname,
      taxcode: gt.taxcode,
      address: gt.address,
    };
    this.showEditDialog(data);
  }
  showEditDialog(data: mdcustomer) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.maxWidth="100%";
    dialogConfig.panelClass = ['md:w-3/4', 'md:h-auto', 'w-[95%]', 'h-[95%]', 'magrin_pane'];
    dialogConfig.data = data;
    dialogConfig.disableClose = true;
    this.dialog.open(EditdataComponent, dialogConfig).afterClosed().subscribe(
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
    if (name_tmp === 'status') {
      this.filter_object.status = gt.value;
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
        key: 'objectcode',
        label: '',
        value: '',
        required: false,
        order: 1
      }),
      new InputText({
        key: 'objectname',
        label: '',
        value: '',
        required: false,
        order: 2
      }),
      new InputText({
        key: 'taxcode',
        label: '',
        value: '',
        required: false,
        order: 3
      }),
      new InputText({
        key: 'address',
        label: '',
        value: '',
        required: false,
        order: 4
      }),
      // new InputDropdown({
      //   key: 'status',
      //   label: '',
      //   options: this.arr_status,
      //   value: '',
      //   order: 3
      // }),
      // new InputDropdown({
      //   key: 'levelion',
      //   label: '',
      //   options: this.arr_level,
      //   value: '',
      //   order: 4
      // }),
    ];
    this.arr_filter = dataIP;
  }
}
