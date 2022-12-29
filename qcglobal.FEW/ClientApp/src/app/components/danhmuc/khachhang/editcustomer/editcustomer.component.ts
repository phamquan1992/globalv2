import { mdcustomer } from './../../../../models/mdcustomer';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { InputControlService } from 'src/app/services/input-control.service';
import { BranchService } from 'src/app/services/branch.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-editcustomer',
  templateUrl: './editcustomer.component.html',
  styleUrls: ['./editcustomer.component.css']
})
export class EditcustomerComponent  {
  constructor(public dialogRef: MatDialogRef<EditcustomerComponent>, @Inject(MAT_DIALOG_DATA) public data: mdcustomer, private controlSrv: InputControlService,
    private branchSrv: BranchService, private messageSrv: MessageService) { }
  arrinput: Inputbase<string>[] = [];
  form!: FormGroup;
  tieu_de = 'Cập nhật khách hàng';
  ngOnInit(): void {
    console.log(JSON.stringify(this.data));
    this.set_data();
    this.form = this.controlSrv.toFormGroup(this.arrinput as Inputbase<string>[]);
  }
  set_data() {
    let arr_status = [{ key: 'true', value: 'Kích hoạt' }, { key: 'false', value: 'Huỷ kích hoạt' }];
    let arr_role = [{ key: '1', value: 'Nhà cung cấp' }, { key: '2', value: 'Khách hàng' }];
    let arr_branch = [{ key: '1', value: 'chi nhánh 1' }, { key: '2', value: 'chi nhánh 2' }];
    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'objectcode',
        label: 'Mã KH',
        value: this.data.objectcode,
        required: true,
        order: 1
      }),
      new InputText({
        key: 'objectname',
        label: 'Tên KH',
        value: this.data.objectname,
        required: true,
        order: 2
      }),
      new InputText({
        key: 'objectname',
        label: 'Địa chỉ',
        value: this.data.address,
        order: 3
      }),
      new InputText({
        key: 'objectname',
        label: 'SDT',
        value: this.data.tel,
        order: 4
      }),
      new InputText({
        key: 'objectname',
        label: 'Email',
        value: this.data.email,
        order: 4
      }),
      new InputDropdown({
        key: 'branchID',
        label: 'Chi nhánh',
        options: arr_branch,
        //value: this.data.obj_edit.branchid !== null && this.data.obj_edit.branchid !== 0 ? this.data.obj_edit.branchid.toString() : '',
        order: 3
      }),
      new InputText({
        key: 'objectname',
        label: 'Mã số thuế',
        value: this.data.email,
        order: 4
      }),
      new InputDropdown({
        key: 'isactive',
        label: 'Vai trò',
        options: arr_role,
        //value: this.data.obj_edit === undefined ? '' : this.data.obj_edit.isactive?.toString(),
        order: 3
      }),
      new InputText({
        key: 'objectname',
        label: 'Ngân hàng',
        value: this.data.address,
        order: 3
      }),
      new InputText({
        key: 'objectname',
        label: 'Số tài khoản',
        value: this.data.tel,
        order: 4
      }),
      new InputDropdown({
        key: 'isactive',
        label: 'Trạng thái',
        options: arr_status,
        //value: this.data.obj_edit === undefined ? '' : this.data.obj_edit.isactive?.toString(),
        order: 3
      }),
    ];
    this.arrinput = dataIP;
  }
  onSubmit() {
    let data_edit = JSON.parse(JSON.stringify(this.form.value));
    console.log(data_edit);
    let value_save: mdcustomer = {
      id: 0,
      objectcode: '',
      objectname: '',
      description: ''
    };
    value_save.id = Number(data_edit['id']);
    value_save.objectcode = data_edit['objectcode'];
    value_save.objectname = data_edit['objectname'];
    value_save.description = data_edit['description'];
    console.log(value_save);
    let thongbao = 'Có lỗi trong quá trình lưu dữ liệu!';
    if (value_save.id === 0) {
      // this.qctitleSrv.add_qctitle(value_save).subscribe(t => {
      //   let kq = t.data;
      //   if (!kq) {
      //     thongbao = t.message;
      //     this.messageSrv.error(thongbao);
      //   } else {
      //     this.messageSrv.success('Bạn đã thực hiện thành công');
      //     this.dialogRef.close('Success');
      //   }
      // });
    } else {
      // this.qctitleSrv.update_qctitle(value_save).subscribe(t => {
      //   let kq = t.data;
      //   if (!kq) {
      //     thongbao = t.message;
      //     this.messageSrv.error(thongbao);
      //   } else {
      //     this.messageSrv.success('Bạn đã thực hiện thành công');
      //     this.dialogRef.close('Success');
      //   }
      // });
    }
  }
  onClose(gt: string) {
    this.dialogRef.close(gt);
  }
}

