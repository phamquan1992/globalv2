import { sys_function } from './../../../../models/sys_function';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { InputControlService } from 'src/app/services/input-control.service';

@Component({
  selector: 'app-editsys-function',
  templateUrl: './editsys-function.component.html',
  styleUrls: ['./editsys-function.component.css']
})
export class EditsysFunctionComponent {
  constructor(public dialogRef: MatDialogRef<EditsysFunctionComponent>, @Inject(MAT_DIALOG_DATA) public data: sys_function, private controlSrv: InputControlService) {

  }
  arrinput: Inputbase<string>[] = [];
  form!: FormGroup;
  tieu_de = 'Cập nhật chức năng';
  ngOnInit(): void {
    console.log(JSON.stringify(this.data));
    this.set_data();
    this.form = this.controlSrv.toFormGroup(this.arrinput as Inputbase<string>[]);
  }
  arr_catefunction = [{ key: '1', value: 'nhom 1' }, { key: '2', value: 'nhom 2' }, { key: '3', value: 'nhom 3' }];
  set_data() {
    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'code',
        label: 'Mã chức năng',
        value: this.data.code,
        required: true,
        order: 1
      }),
      new InputText({
        key: 'name',
        label: 'Tên chức năng',
        value: this.data.name,
        required: true,
        order: 2
      }),
      new InputDropdown({
        key: 'categoryfunctionid',
        label: 'Nhóm chức năng',
        options: this.arr_catefunction,
        //value: this.data.categoryfunctionid == null ? 'all' : this.data.categoryfunctionid?.toString(),
        order: 4
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

