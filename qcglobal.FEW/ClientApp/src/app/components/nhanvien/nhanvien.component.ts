import { mdteamsService } from './../../services/mdteams.service';
import { DepartmentService } from 'src/app/services/department.service';
import { EditemployeeComponent } from './editemployee/editemployee.component';
import { AlertComponent } from 'src/app/shared/alert/alert.component';
import { EmployeeService } from './../../services/employee.service';
import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { employee } from 'src/app/models/employee';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { InputControlService } from 'src/app/services/input-control.service';
import { MessageService } from 'src/app/services/message.service';
import { BranchService } from 'src/app/services/branch.service';
import { QcTitleService } from 'src/app/services/qctitle.service';

@Component({
  selector: 'app-nhanvien',
  templateUrl: './nhanvien.component.html',
  styleUrls: ['./nhanvien.component.css']
})
export class NhanvienComponent implements OnInit, AfterViewInit {
  arr_employee: employee[] = [];
  dataSource = new MatTableDataSource<employee>(this.arr_employee);
  arr_mdteam: { key: string, value: string }[] = [];
  arr_title: { key: string, value: string }[] = [];
  loading$ = false;
  name_filter = '';
  displayedColumns: string[] = ['select', 'employeeCode', 'employeeName', 'mdTeamsID', 'telephone', 'address', 'status', 'action'];
  displayedColumns2: string[] = ['cot1', 'employeeCode_filter', 'employeeName_filter', 'mdTeamsID_filter',
    'telephone_filter', 'address_filter', 'status_filter', 'cot6'];
  selection = new SelectionModel<employee>(true, []);
  arr_filter: Inputbase<string>[] = [];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  formfilter!: FormGroup;
  filter_object = {
    employeeCode: '',
    employeeName: '',
    mdTeamsID: '',
    telephone: '',
    address: '',
    status: true
  }
  constructor(private dialog: MatDialog, private controlSrv: InputControlService, private messSrv: MessageService,
    private EmployeeService: EmployeeService, private qctitleSrv: QcTitleService, private mdteamSrv: mdteamsService, private departmentSrv: DepartmentService) {

  }
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }
  ngOnInit(): void {
    this.get_data();
    this.EmployeeService.f5_service().subscribe(t => {
      this.get_data();
    });
  }
  get_data() {
    this.arr_employee = [];
    this.EmployeeService.get_list().subscribe(t => {
      this.arr_employee = t;
      this.mdteamSrv.get_list().subscribe(mdteam => {
        this.arr_mdteam = mdteam.map(({ id, teamname }) => {
          let tmp: { key: string, value: string } = {
            key: '',
            value: ''
          };
          tmp.key = id.toString();
          tmp.value = teamname;
          return tmp;
        });
        this.qctitleSrv.get_list().subscribe(qc_title => {
          this.arr_title = qc_title.map(({ id, titlename }) => {
            let tmp1: { key: string, value: string } = {
              key: '',
              value: ''
            };
            tmp1.key = id.toString();
            tmp1.value = titlename;
            return tmp1;
          })

          this.set_filter();
          this.dataSource = new MatTableDataSource<employee>(this.arr_employee);
          this.dataSource.filterPredicate = this.createFilter();
          this.dataSource.paginator = this.paginator;
          this.onchange();

        });

      });
    });
  }

  get_parentMDteams(id_parent: number) {
    let gt = '';
    let index = this.arr_mdteam.findIndex(t => t.key == id_parent.toString());
    if (index !== -1) {
      gt = this.arr_mdteam[index].value;
    }
    return gt;
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
    this.EmployeeService.delete_arr(arrID).subscribe(t => {
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
    this.EmployeeService.delete_arr(arrID).subscribe(t => {
      if (t.data) {
        this.messSrv.success('Bạn đã thực hiện thành công!');
        this.selection.clear();
      } else {
        this.messSrv.error('Có lỗi trong quá trình lưu dữ liệu');
      }
    });
  }

  sua_item(gt: employee) {
    let data: employee = {
      employeeCode: gt.employeeCode,
      employeeName: gt.employeeName,
      address: gt.address,
      sex: gt.sex,
      image: gt.image,
      email: gt.email,
      telephone: gt.telephone,
      mdTeamsID: gt.mdTeamsID,
      titleID: gt.titleID,
      status: gt.status,
      nation: gt.nation,
      religion: gt.religion,
      nativeCountry: gt.nativeCountry,
      identityCard: gt.identityCard,
      placeIssueIDCard: gt.placeIssueIDCard,
      education: gt.education,
      foreignLanguage: gt.foreignLanguage,
      professionalQualification: gt.professionalQualification,
      fatherName: gt.fatherName,
      fatherAddress: gt.fatherAddress,
      fatherContact: gt.fatherContact,
      motherName: gt.motherName,
      motherAddress: gt.motherAddress,
      motherContact: gt.motherContact,
      siblingsName: gt.siblingsName,
      siblingsAddress: gt.siblingsAddress,
      siblingsContact: gt.siblingsContact,
      id: gt.id,
      list_mdteam: this.arr_mdteam,
      list_title: this.arr_title
    };
    this.showEditDialog(data);
  }
  showEditDialog(data: employee) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    dialogConfig.width = "860px";
    dialogConfig.panelClass = "pd_dialog_none";
    dialogConfig.data = data;
    dialogConfig.disableClose = true;
    this.dialog.open(EditemployeeComponent, dialogConfig).afterClosed().subscribe(
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
      this.filter_object.employeeCode = gt.value;
    }
    if (name_tmp === 'name') {
      this.filter_object.employeeName = gt.value;
    }
    if (name_tmp === 'mdTeamsID') {
      this.filter_object.mdTeamsID = gt.value;
    }
    if (name_tmp === 'telephone') {
      this.filter_object.telephone = gt.value;
    }
    if (name_tmp === 'address') {
      this.filter_object.address = gt.value;
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
    let tmp: employee = {
      id: 0,
      employeeCode: '',
      employeeName: '',
      address: '',
      sex: 0,
      image: '',
      email: '',
      telephone: '',
      mdTeamsID: 0,
      titleID: 0,
      status: 0,
      nation: '',
      religion: '',
      nativeCountry: '',
      identityCard: '',
      placeIssueIDCard: '',
      education: '',
      foreignLanguage: '',
      professionalQualification: '',
      fatherName: '',
      fatherAddress: '',
      fatherContact: '',
      motherName: '',
      motherAddress: '',
      motherContact: '',
      siblingsName: '',
      siblingsAddress: '',
      siblingsContact: '',
      list_mdteam: this.arr_mdteam,
      list_title: this.arr_title
    };
    this.showEditDialog(tmp);
  }
  createFilter() {
    let filterFunction = function (data: any, filter: string): boolean {
      let searchTerms = JSON.parse(filter);

      let isFilterSet = false;
      for (const col in searchTerms) {
        if (col !== 'status' && col !== 'mdTeamsID') {
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
            if (col !== 'status' && col !== 'mdTeamsID') {
              let filter_str = data[col] || '';
              if (filter_str.toString().toLowerCase().indexOf(searchTerms[col].trim().toLowerCase()) != -1 && isFilterSet) {
                found = true
              } else {
                found = false;
              }
              arr.push(found);
            }
            else {
              let filter2 = data[col] || 1;
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
  arr_status = [{ key: '0', value: 'Đang làm việc' }, { key: '1', value: 'Đã nghỉ việc' }];
  set_data() {
    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'employeeCode',
        label: '',
        value: '',
        required: false,
        order: 1
      }),
      new InputText({
        key: 'employeeName',
        label: '',
        value: '',
        required: false,
        order: 1
      }),
      new InputDropdown({
        key: 'mdTeamsID',
        label: '',
        options: this.arr_mdteam,
        value: '',
        order: 3
      }),
      new InputText({
        key: 'telephone',
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
      new InputDropdown({
        key: 'status',
        label: '',
        options: this.arr_status,
        value: '',
        order: 5
      }),
    ];
    this.arr_filter = dataIP;
  }

}
