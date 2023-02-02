import { roles } from './../../../../models/roles';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { InputControlService } from 'src/app/services/input-control.service';
import { MessageService } from 'src/app/services/message.service';
import { RolesService } from 'src/app/services/roles.service';

@Component({
  selector: 'app-editsys-role',
  templateUrl: './editsys-role.component.html',
  styleUrls: ['./editsys-role.component.css']
})
export class EditsysRoleComponent{
  constructor(public dialogRef: MatDialogRef<EditsysRoleComponent>, @Inject(MAT_DIALOG_DATA) public data: roles,private messageSrv: MessageService,
   private controlSrv: InputControlService,private rolesrv: RolesService) {

  }
  arrinput: Inputbase<string>[] = [];
  form!: FormGroup;
  tieu_de = 'Cập nhật vai trò';
  ngOnInit(): void {
    this.set_data();
    this.form = this.controlSrv.toFormGroup(this.arrinput as Inputbase<string>[]);
  }
  set_data() {
    let arr_status = [{ key: '1', value: 'Kích hoạt' }, { key: '0', value: 'Huỷ kích hoạt' }];
    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'name',
        label: 'Tên vai trò',
        value: this.data.name,
        required: true,
        order: 1
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
    let value_save: roles = {
      id: 0,
      name: '',
      active: 0
    };
    value_save.id = Number(data_edit['id']);
    value_save.name = data_edit['name'];
    if (data_edit['active'] !== '' && data_edit['active'] !== undefined) {
      value_save.active = Number(data_edit['active']['key']);
    }
    let thongbao = 'Có lỗi trong quá trình lưu dữ liệu!';
    if (value_save.id === 0) {
      this.rolesrv.add_roles(value_save).subscribe(t => {
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
      this.rolesrv.update_roles(value_save).subscribe(t => {
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
