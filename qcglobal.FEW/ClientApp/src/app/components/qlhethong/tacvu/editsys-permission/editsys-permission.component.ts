import { SelectionModel } from '@angular/cdk/collections';
import { AfterViewInit, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialog, MatDialogConfig, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { permission } from 'src/app/models/permission';
import { InputControlService } from 'src/app/services/input-control.service';
import { MessageService } from 'src/app/services/message.service';
import { PermissionService } from 'src/app/services/permission.service';

@Component({
  selector: 'app-editsys-permission',
  templateUrl: './editsys-permission.component.html',
  styleUrls: ['./editsys-permission.component.css']
})
export class EditsysPermissionComponent  {
  constructor(public dialogRef: MatDialogRef<EditsysPermissionComponent>, @Inject(MAT_DIALOG_DATA) public data: permission,private messageSrv: MessageService,
   private controlSrv: InputControlService,private permissionSrv: PermissionService) {

  }
  arrinput: Inputbase<string>[] = [];
  form!: FormGroup;
  tieu_de = 'Cập nhật tác vụ';
  ngOnInit(): void {
    this.set_data();
    this.form = this.controlSrv.toFormGroup(this.arrinput as Inputbase<string>[]);
  }
  set_data() {
    let arr_status = [{ key: '1', value: 'Kích hoạt' }, { key: '0', value: 'Huỷ kích hoạt' }];
    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'name',
        label: 'Tên tác vụ',
        value: this.data.name,
        required: true,
        order: 1
      }),
      new InputDropdown({
        key: 'functionid',
        label: 'Chức năng',
        required: true,
        options: this.data.list_function,
        value: this.data.functionid !== null && this.data.functionid !== 0 ? this.data.functionid?.toString() : '',
        order: 2
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
    let value_save: permission = {
      id: 0,
      name: '',
      functionid: 0,
      description: '',
      active: 0
    };
    value_save.id = Number(data_edit['id']);
    value_save.name = data_edit['name'];
    value_save.description = data_edit['description'];

    if (data_edit['active'] !== '' && data_edit['active'] !== undefined) {
      value_save.active = Number(data_edit['active']['key']);
    }

    if (data_edit['functionid'] !== '' && data_edit['functionid'] !== undefined) {
      value_save.functionid = Number(data_edit['functionid']['key']);
    }

    let thongbao = 'Có lỗi trong quá trình lưu dữ liệu!';
    if (value_save.id === 0) {
      this.permissionSrv.add_permission(value_save).subscribe(t => {
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
      this.permissionSrv.update_permission(value_save).subscribe(t => {
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


