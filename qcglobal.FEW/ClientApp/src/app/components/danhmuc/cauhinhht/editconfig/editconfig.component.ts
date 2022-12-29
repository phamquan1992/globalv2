import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { mdconfig } from 'src/app/models/mdconfig';
import { InputControlService } from 'src/app/services/input-control.service';
import { BranchService } from 'src/app/services/branch.service';
import { MessageService } from 'src/app/services/message.service';
import { QcTitleService } from 'src/app/services/qctitle.service';

@Component({
  selector: 'app-editconfig',
  templateUrl: './editconfig.component.html',
  styleUrls: ['./editconfig.component.css']
})
export class EditconfigComponent {
  constructor(public dialogRef: MatDialogRef<EditconfigComponent>, @Inject(MAT_DIALOG_DATA) public data: mdconfig, private controlSrv: InputControlService,
    private branchSrv: BranchService, private messageSrv: MessageService, private qctitleSrv: QcTitleService) { }
  arrinput: Inputbase<string>[] = [];
  form!: FormGroup;
  tieu_de = 'Cập nhật cấu hình hệ thống';
  ngOnInit(): void {
    console.log(JSON.stringify(this.data));
    this.set_data();
    this.form = this.controlSrv.toFormGroup(this.arrinput as Inputbase<string>[]);
  }
  set_data() {
    let arr_status = [{ key: 'true', value: 'Kích hoạt' }, { key: 'false', value: 'Huỷ kích hoạt' }];
    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'titlecode',
        label: 'Mã cấu hình',
        value: this.data.configcode,
        required: true,
        order: 1
      }),
      new InputText({
        key: 'configname',
        label: 'Tên cấu hình',
        value: this.data.configname,
        required: true,
        order: 2
      }),
      new InputText({
        key: 'description',
        label: 'Mô tả',
        value: this.data.description,
        order: 3
      })
    ];
    this.arrinput = dataIP;
  }
  onSubmit() {
    let data_edit = JSON.parse(JSON.stringify(this.form.value));
    console.log(data_edit);
    let value_save: mdconfig = {
      id: 0,
      configcode: '',
      configname: '',
      description: ''
    };
    value_save.id = Number(data_edit['id']);
    value_save.configcode = data_edit['configcode'];
    value_save.configname = data_edit['configname'];
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

