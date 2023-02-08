import { role } from './../../../../models/role';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { InputControlService } from 'src/app/services/input-control.service';
import { MessageService } from 'src/app/services/message.service';
import { roleService } from 'src/app/services/role.service';
import { CdkDragDrop, moveItemInArray, transferArrayItem } from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-editsys-role',
  templateUrl: './editsys-role.component.html',
  styleUrls: ['./editsys-role.component.css']
})
export class EditsysRoleComponent {
  constructor(public dialogRef: MatDialogRef<EditsysRoleComponent>, @Inject(MAT_DIALOG_DATA) public data: role, private messageSrv: MessageService,
    private controlSrv: InputControlService, private rolerv: roleService) {

  }
  arrinput: Inputbase<string>[] = [];
  form!: FormGroup;
  tieu_de = 'Cập nhật vai trò';

  notIncludePermission = [
    'Chưa tồn tại trong vai trò'
  ];

  includedPermission = [
    'Cập nhật trong vai trò'
  ];

  lstPer: any;

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.lstPer = event.container.data;
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
      this.lstPer = event.container.data;
    }
  }


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

    if (this.data.lstpermissionid != undefined && this.data.list_per && this.data.list_per.length > 0) {
      let arr_permissionid = this.data.lstpermissionid.split(",");
      this.data.list_per.forEach(item => {
        if (arr_permissionid.includes(item.key)) {
          this.includedPermission.unshift(item.value)
        }
        else {
          this.notIncludePermission.unshift(item.value)
        }
      });
    }

  }

  onSubmit() {
    let data_edit = JSON.parse(JSON.stringify(this.form.value));

    let tmp_arrPermission: String[] = [];
    let cloneincludedPermission = JSON.parse(JSON.stringify(this.includedPermission));
    if (this.data.id === 0) {
      if (cloneincludedPermission != undefined && cloneincludedPermission.length > 1 &&  this.data.list_per) {
        this.data.list_per.forEach((x) => {
          if (cloneincludedPermission.includes(x.value)) {
            tmp_arrPermission.push(x.key);
          }
        });
      }
    }
    else {
      if (cloneincludedPermission == undefined  && cloneincludedPermission.length == 1 && this.data.lstpermissionid != undefined) {
        tmp_arrPermission = [];
      }
      else {
        if (cloneincludedPermission != undefined  && cloneincludedPermission.length > 1 && this.data.list_per) {
          this.data.list_per.forEach((x) => {
            if (cloneincludedPermission.includes(x.value)) {
              tmp_arrPermission.push(x.key);
            }
          });
        }
      }
    }

    let value_save: role = {
      id: 0,
      name: '',
      active: 0
    };
    value_save.id = Number(data_edit['id']);
    value_save.name = data_edit['name'];
    if (data_edit['active'] !== '' && data_edit['active'] !== undefined) {
      value_save.active = Number(data_edit['active']['key']);
    }

    value_save.lstpermissionid = tmp_arrPermission.toString();

    let thongbao = 'Có lỗi trong quá trình lưu dữ liệu!';
    if (value_save.id === 0) {
      this.rolerv.add_role(value_save).subscribe(t => {
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
      this.rolerv.update_role(value_save).subscribe(t => {
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
