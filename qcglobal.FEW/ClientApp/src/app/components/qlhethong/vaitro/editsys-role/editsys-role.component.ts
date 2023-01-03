import { sys_role } from './../../../../models/sys_role';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { InputControlService } from 'src/app/services/input-control.service';

@Component({
  selector: 'app-editsys-role',
  templateUrl: './editsys-role.component.html',
  styleUrls: ['./editsys-role.component.css']
})
export class EditsysRoleComponent {
  constructor(public dialogRef: MatDialogRef<EditsysRoleComponent>, @Inject(MAT_DIALOG_DATA) public data: sys_role, private controlSrv: InputControlService) {

  }
  arrinput: Inputbase<string>[] = [];
  form!: FormGroup;
  tieu_de = 'Cập nhật vai trò';
  ngOnInit(): void {
    console.log(JSON.stringify(this.data));
    this.set_data();
    this.form = this.controlSrv.toFormGroup(this.arrinput as Inputbase<string>[]);
  }
  set_data() {
    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'code',
        label: 'Mã vai trò',
        value: this.data.code,
        required: true,
        order: 1
      }),
      new InputText({
        key: 'name',
        label: 'Tên vai trò',
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
