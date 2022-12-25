import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { qc_title, qctitle_edit } from 'src/app/models/qc_title';
import { InputControlService } from 'src/app/services/input-control.service';
import { BranchService } from 'src/app/services/branch.service';
import { MessageService } from 'src/app/services/message.service';
import { QcTitleService } from 'src/app/services/qctitle.service';

@Component({
  selector: 'app-editchucvu',
  templateUrl: './editchucvu.component.html',
  styleUrls: ['./editchucvu.component.css']
})
export class EditchucvuComponent {
  constructor(public dialogRef: MatDialogRef<EditchucvuComponent>, @Inject(MAT_DIALOG_DATA) public data: qctitle_edit, private controlSrv: InputControlService,
    private branchSrv: BranchService, private messageSrv: MessageService, private qctitleSrv: QcTitleService) { }
  arrinput: Inputbase<string>[] = [];
  form!: FormGroup;
  tieu_de = 'Cập nhật lĩnh vực chuyên ngành';
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
        label: 'Mã chức vụ',
        value: this.data.obj_edit.titlecode,
        required: true,
        order: 1
      }),
      new InputText({
        key: 'titlename',
        label: 'Tên chức vụ',
        value: this.data.obj_edit.titlename,
        required: true,
        order: 2
      }),
      new InputDropdown({
        key: 'departmentid',
        label: 'Phòng ban',
        options: this.data.list_department,
        value: this.data.obj_edit.departmentid !== null && this.data.obj_edit.departmentid !== 0 ? this.data.obj_edit.departmentid.toString() : '',
        order: 3
      }),
      new InputText({
        key: 'description',
        label: 'Mô tả',
        value: this.data.obj_edit.description,
        order: 3
      }),
      new InputDropdown({
        key: 'isactive',
        label: 'Trạng thái',
        options: arr_status,
        value: this.data.obj_edit === undefined ? '' : this.data.obj_edit.isactive?.toString(),
        order: 3
      }),
      new InputText({
        key: 'id',
        label: '',
        value: this.data.obj_edit.id.toString(),
        type: 'hidden',
        order: 4
      }),
    ];
    this.arrinput = dataIP;
  }
  onSubmit() {
    let data_edit = JSON.parse(JSON.stringify(this.form.value));
    console.log(data_edit);
    let value_save: qc_title = {
      id: 0,
      departmentid: 0,
      titlecode: '',
      titlename: '',
      description: ''
    };
    value_save.id = Number(data_edit['id']);
    value_save.titlecode = data_edit['titlecode'];
    value_save.titlename = data_edit['titlename'];
    value_save.description = data_edit['description'];
    if (data_edit['isactive'] !== '' && data_edit['isactive'] !== undefined) {
      value_save.isactive = data_edit['isactive']['key'].toString() === 'true';
    }
    if (data_edit['departmentid'] !== '' && data_edit['departmentid'] !== undefined) {
      value_save.departmentid = Number(data_edit['departmentid']['key']);
    }
    console.log(value_save);
    let thongbao = 'Có lỗi trong quá trình lưu dữ liệu!';
    if (value_save.id === 0) {
      this.qctitleSrv.add_qctitle(value_save).subscribe(t => {
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
      this.qctitleSrv.update_qctitle(value_save).subscribe(t => {
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
