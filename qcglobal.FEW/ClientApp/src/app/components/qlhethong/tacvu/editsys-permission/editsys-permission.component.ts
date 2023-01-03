import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { sys_permission } from 'src/app/models/sys_permission';
import { InputControlService } from 'src/app/services/input-control.service';

@Component({
  selector: 'app-editsys-permission',
  templateUrl: './editsys-permission.component.html',
  styleUrls: ['./editsys-permission.component.css']
})
export class EditsysPermissionComponent  {
  constructor(public dialogRef: MatDialogRef<EditsysPermissionComponent>, @Inject(MAT_DIALOG_DATA) public data: sys_permission, private controlSrv: InputControlService) {

  }
  arrinput: Inputbase<string>[] = [];
  form!: FormGroup;
  tieu_de = 'Cập nhật tác vụ';
  ngOnInit(): void {
    console.log(JSON.stringify(this.data));
    this.set_data();
    this.form = this.controlSrv.toFormGroup(this.arrinput as Inputbase<string>[]);
  }
  arr_catepermission = [{ key: '1', value: 'nhom 1' }, { key: '2', value: 'nhom 2' }, { key: '3', value: 'nhom 3' }];
  arr_function = [{ key: '1', value: 'chuc nang 1' }, { key: '2', value: 'chuc nang 2' }];
  set_data() {
    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'code',
        label: 'Mã tác vụ',
        value: this.data.code,
        required: true,
        order: 1
      }),
      new InputText({
        key: 'name',
        label: 'Tên tác vụ',
        value: this.data.name,
        required: true,
        order: 2
      }),
      new InputText({
        key: 'description',
        label: 'Mô tả',
        value: this.data.description,
        required: true,
        order: 3
      }),
      new InputDropdown({
        key: 'categoryfunctionid',
        label: 'Nhóm tác vụ',
        options: this.arr_catepermission,
        //value: this.data.categoryfunctionid == null ? 'all' : this.data.categoryfunctionid?.toString(),
        order: 4
      }),
      new InputDropdown({
        key: 'funtionid',
        label: 'Chức năng',
        options: this.arr_function,
        //value: this.data.categoryfunctionid == null ? 'all' : this.data.categoryfunctionid?.toString(),
        order: 5
      }),
    ];
    this.arrinput = dataIP;
  }
  onSubmit() {
    let data_edit = JSON.parse(JSON.stringify(this.form.value));
    console.log(data_edit);
  }
  onClose(gt: string) {
    this.dialogRef.close(gt);
  }
}

