import { EmployeeService } from './../../../services/employee.service';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { userdata } from 'src/app/models/userdata';
import { FunctionService } from 'src/app/services/function.service';
import { InputControlService } from 'src/app/services/input-control.service';
import { MessageService } from 'src/app/services/message.service';
import { userdataService } from 'src/app/services/userdata.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { EdituserdataComponent } from './edituserdata/edituserdata.component';
import { roleService } from 'src/app/services/role.service';

@Component({
  selector: 'app-nguoidung',
  templateUrl: './nguoidung.component.html',
  styleUrls: ['./nguoidung.component.css']
})
export class NguoidungComponent implements OnInit, AfterViewInit {
  arr_username: userdata[] = [];
  arr_email: { key: string, value: string }[] = [];
  arr_role: { key: string, value: string }[] = [];
  dataSource = new MatTableDataSource<userdata>(this.arr_username);
  loading$ = false;
  name_filter = '';
  arr_function: { key: string, value: string }[] = [];
  displayedColumns: string[] = ['select', 'username','email','status', 'action'];
  displayedColumns2: string[] = ['cot1', 'username_filter','email_filter','status_filter','cot6'];
  selection = new SelectionModel<userdata>(true, []);
  arr_filter: Inputbase<string>[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  formfilter!: FormGroup;
  filter_object = {
    username: '',
    email: '',
    status: 0
  }
  constructor(private dialog: MatDialog, private functionSrv: FunctionService, private roleSrv: roleService, private EmployeeService: EmployeeService, private userdataSrv: userdataService, private controlSrv: InputControlService, private messSrv: MessageService,) {

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.get_data();
    this.userdataSrv.f5_service().subscribe(t => {
      this.get_data();
    });
  }
  get_data() {
    this.arr_username = [];
    this.userdataSrv.get_list().subscribe(t => {
      this.arr_username = t;
      this.EmployeeService.get_list().subscribe(employee => {
        this.arr_email = employee.map(({ id, email }) => {
          let tmp1: { key: string, value: string } = {
            key: '',
            value: ''
          };
          if(email != undefined && email!=null){
            tmp1.key = email;
            tmp1.value = email;
          }
          else{
            tmp1.key = '';
            tmp1.value = '';
          }
          return tmp1;
        })

        this.roleSrv.get_list().subscribe(roles => {
          this.arr_role = roles.map(({ id, name }) => {
            let tmp: { key: string, value: string } = {
              key: '',
              value: ''
            };
            tmp.key = id.toString();
            tmp.value = name;
            return tmp;
          });
          this.set_filter();
          this.dataSource = new MatTableDataSource<userdata>(this.arr_username);
          this.dataSource.filterPredicate = this.createFilter();
          this.dataSource.paginator = this.paginator;
          this.onchange();
        });

      });

    });
  }

  set_filter() {
    this.set_data();
    this.formfilter = this.controlSrv.toFormGroup(this.arr_filter as Inputbase<string>[]);
  }

  set_data() {
    let arr_status = [{  key: '1', value: 'Đã Kích hoạt' }, { key: '0', value: 'Chưa kích hoạt' }];
    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'username',
        label: '',
        value: '',
        required: false,
        order: 1
      }),
      new InputText({
        key: 'password',
        label: '',
        value: '',
        required: false,
        order: 1
      }),
      new InputText({
        key: 'email',
        label: '',
        value: '',
        required: false,
        order: 1
      }),
      new InputText({
        key: 'serialtoken',
        label: '',
        value: '',
        required: false,
        order: 1
      }),
      new InputText({
        key: 'isadmin',
        label: '',
        value: '',
        required: false,
        order: 1
      }),
      new InputDropdown({
        key: 'status',
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
    this.userdataSrv.delete_arr(arrID).subscribe(t => {
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
    this.userdataSrv.delete_arr(arrID).subscribe(t => {
      if (t.data) {
        this.messSrv.success('Bạn đã thực hiện thành công!');
        this.selection.clear();
      } else {
        this.messSrv.error('Có lỗi trong quá trình lưu dữ liệu');
      }
    });
  }

  sua_item(gt: userdata) {
    let data: userdata = {
      id: gt.id,
      username: gt.username,
      password: gt.password,
      email: gt.email,
      serialtoken: gt.serialtoken,
      isadmin: gt.isadmin,
      status: gt.status,
      lstroleid: gt.lstroleid,
      list_email : this.arr_email,
      list_role : this.arr_role
    };
    this.showEditDialog(data);
  }

  showEditDialog(data: userdata) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "620px";
    dialogConfig.panelClass = "pd_dialog_none";
    dialogConfig.data = data;
    dialogConfig.disableClose = true;
    this.dialog.open(EdituserdataComponent, dialogConfig).afterClosed().subscribe(
      res => {
        if (res != null && res != '' && res != undefined) {

        }
      }
    );
  }

  applyFilter(name_filter: string, gt: any) {
    let name_tmp = name_filter.split('_')[0];
    if (name_tmp === 'username') {
      this.filter_object.username = gt.value;
    }
    if (name_tmp === 'email') {
      this.filter_object.email = gt.value;
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
    let tmp: userdata = {
      username: '',
      password: '',
      email: '',
      serialtoken: '',
      isadmin: 0,
      id: 0,
      lstroleid:'',
      list_email : this.arr_email,
      list_role : this.arr_role
    };
    this.showEditDialog(tmp);
  }
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (col !== 'status') {
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
            if (col !== 'status') {
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

