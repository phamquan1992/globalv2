import { functions } from './../../../../models/functions';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { InputControlService } from 'src/app/services/input-control.service';
import { MessageService } from 'src/app/services/message.service';
import { FunctionService } from 'src/app/services/function.service';

@Component({
  selector: 'app-editsys-function',
  templateUrl: './editsys-function.component.html',
  styleUrls: ['./editsys-function.component.css']
})
export class EditsysFunctionComponent {
  constructor(public dialogRef: MatDialogRef<EditsysFunctionComponent>, @Inject(MAT_DIALOG_DATA) public data: functions,private messageSrv: MessageService,
   private controlSrv: InputControlService,private functionSrv: FunctionService) {

  }
  arrinput: Inputbase<string>[] = [];
  form!: FormGroup;
  tieu_de = 'Cập nhật chức năng';
  ngOnInit(): void {
    this.set_data();
    this.form = this.controlSrv.toFormGroup(this.arrinput as Inputbase<string>[]);
  }
  set_data() {
    let arr_status = [{ key: '1', value: 'Kích hoạt' }, { key: '0', value: 'Huỷ kích hoạt' }];
    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'name',
        label: 'Tên chức năng',
        value: this.data.name,
        required: true,
        order: 1
      }),
      new InputText({
        key: 'description',
        label: 'Mô tả',
        value: this.data.description,
        order: 3
      }),
      new InputDropdown({
        key: 'active',
        label: 'Trạng thái',
        options: arr_status,
        value: this.data.active === 0 ? '0' : '1',
        order: 4
      }),
      new InputText({
        key: 'id',
        label: '',
        value: this.data.id.toString(),
        type: 'hidden',
        order: 5
      }),
    ];
    this.arrinput = dataIP;
  }
  onSubmit() {
    let data_edit = JSON.parse(JSON.stringify(this.form.value));
    console.log(data_edit);
    let value_save: functions = {
      id: 0,
      name: '',
      description: '',
      active: 0
    };
    value_save.id = Number(data_edit['id']);
    value_save.name = data_edit['name'];
    value_save.description = data_edit['description'];
    debugger;
    if (data_edit['active'] !== '' && data_edit['active'] !== undefined) {
      value_save.active = Number(data_edit['active']['key']);
    }
    let thongbao = 'Có lỗi trong quá trình lưu dữ liệu!';
    if (value_save.id === 0) {
      this.functionSrv.add_function(value_save).subscribe(t => {
        let kq = t.data;
        if (!kq) {
          thongbao = t.message;
          this.messageSrv.error(thongbao);
        } else {
          this.messageSrv.success('Bạn đã thực hiện thành công');
          this.dialogRef.close('Success');
        }
      });
    } else {
      this.functionSrv.update_function(value_save).subscribe(t => {
        let kq = t.data;
        if (!kq) {
          thongbao = t.message;
          this.messageSrv.error(thongbao);
        } else {
          this.messageSrv.success('Bạn đã thực hiện thành công');
          this.dialogRef.close('Success');
        }
      });
    }
  }
  onClose(gt: string) {
    this.dialogRef.close(gt);
  }
}

