import { logsystem } from './../../../models/logsystem';
import { EditsysRoleComponent } from './editsys-role/editsys-role.component';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { role } from 'src/app/models/role';
import { InputControlService } from 'src/app/services/input-control.service';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { roleService } from 'src/app/services/role.service';
import { MessageService } from 'src/app/services/message.service';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-vaitro',
  templateUrl: './vaitro.component.html',
  styleUrls: ['./vaitro.component.css']
})
export class VaitroComponent implements OnInit, AfterViewInit {
  arr_role: role[] = [];
  arr_per: { key: string, value: string }[] = [];
  dataSource = new MatTableDataSource<role>(this.arr_role);
  loading$ = false;
  name_filter = '';
  displayedColumns: string[] = ['select', 'name','active', 'action'];
  displayedColumns2: string[] = ['cot1', 'name_filter','active_filter','cot6'];
  selection = new SelectionModel<role>(true, []);
  arr_filter: Inputbase<string>[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  formfilter!: FormGroup;
  filter_object = {
    name: '',
    active: 0
  }
  constructor(private dialog: MatDialog, private rolerv: roleService,private permissionSrv: PermissionService, private controlSrv: InputControlService, private messSrv: MessageService,) {

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.get_data();
    this.rolerv.f5_service().subscribe(t => {
      this.get_data();
    });
  }
  get_data() {
    this.arr_role = [];
    this.rolerv.get_list().subscribe(t => {
      this.arr_role = t;

      this.permissionSrv.get_list().subscribe(per => {
        this.arr_per = per.map(({ id, name }) => {
          let tmp: { key: string, value: string } = {
            key: '',
            value: ''
          };
          tmp.key = id.toString();
          tmp.value = name;
          return tmp;
        });

      });

      this.set_filter();
      this.dataSource = new MatTableDataSource<role>(this.arr_role);
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
    let arr_status = [{  key: '1', value: 'K??ch ho???t' }, { key: '0', value: 'Hu??? k??ch ho???t' }];
    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'name',
        label: '',
        value: '',
        required: false,
        order: 1
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
        this.messSrv.error('B???n ch??a ch???n b???n ghi n??o');
        return;
      }
    }
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = false;
    dialogConfig.autoFocus = true;
    dialogConfig.width = "390px";
    dialogConfig.panelClass = "pd_dialog_none";
    dialogConfig.data = "B???n ch???c ch???n mu???n xo?? b???n ghi n??y?";
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
    this.rolerv.delete_arr(arrID).subscribe(t => {
      if (t.data) {
        this.messSrv.success('B???n ???? th???c hi???n th??nh c??ng!');
        this.selection.clear();
      } else {
        this.messSrv.error('C?? l???i trong qu?? tr??nh l??u d??? li???u');
      }
    });
  }

  Xoa_arr() {
    let arrID = this.selection.selected.map(t => t.id);
    this.rolerv.delete_arr(arrID).subscribe(t => {
      if (t.data) {
        this.messSrv.success('B???n ???? th???c hi???n th??nh c??ng!');
        this.selection.clear();
      } else {
        this.messSrv.error('C?? l???i trong qu?? tr??nh l??u d??? li???u');
      }
    });
  }

  sua_item(gt: role) {
    let data: role = {
      id: gt.id,
      name: gt.name,
      active: gt.active,
      lstpermissionid: gt.lstpermissionid,
      list_per: this.arr_per
    };
    this.showEditDialog(data);
  }

  showEditDialog(data: role) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "520px";
    dialogConfig.panelClass = "pd_dialog_none";
    dialogConfig.data = data;
    dialogConfig.disableClose = true;
    this.dialog.open(EditsysRoleComponent, dialogConfig).afterClosed().subscribe(
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
    if (name_tmp === 'active') {
      this.filter_object.active = gt.value;
    }
    this.dataSource.filter = JSON.stringify(this.filter_object);
    this.dataSource.paginator = this.paginator;
  }
  reload_grid() {

  }

  them_moi() {
    let tmp: role = {
      name: '',
      active: 1,
      id: 0,
      lstpermissionid: '',
      list_per: this.arr_per
    };
    this.showEditDialog(tmp);
  }
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);
      let isFilterSet = false;
      for (const col in searchTerms) {
        if (col !== 'active') {
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
            if (col !== 'active') {
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

