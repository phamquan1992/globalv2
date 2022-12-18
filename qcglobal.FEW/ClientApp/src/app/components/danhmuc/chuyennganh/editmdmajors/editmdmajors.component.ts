import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { branch } from 'src/app/models/branch';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { mdmajors } from 'src/app/models/mdmajors';
import { InputControlService } from 'src/app/services/input-control.service';
import { MdmajorsService } from 'src/app/services/mdmajors.service';
import { MessageService } from 'src/app/services/message.service';
@Component({
  selector: 'app-editmdmajors',
  templateUrl: './editmdmajors.component.html',
  styleUrls: ['./editmdmajors.component.css']
})
export class EditmdmajorsComponent {
  constructor(public dialogRef: MatDialogRef<EditmdmajorsComponent>, @Inject(MAT_DIALOG_DATA) public data: mdmajors,private messageSrv: MessageService,
   private controlSrv: InputControlService,private mdmajorsSrv: MdmajorsService) {

  }
  arrinput: Inputbase<string>[] = [];
  form!: FormGroup;
  tieu_de = 'Cập nhật lĩnh vực chuyên ngành';
  ngOnInit(): void {
    console.log(JSON.stringify(this.data));
    this.set_data();
    this.form = this.controlSrv.toFormGroup(this.arrinput as Inputbase<string>[]);
  }
  set_data() {
    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'majorscode',
        label: 'Mã chuyên ngành',
        value: this.data.majorscode,
        required: true,
        order: 1
      }),
      new InputText({
        key: 'majorsname',
        label: 'Tên chuyên ngành',
        value: this.data.majorsname,
        required: true,
        order: 2
      }),
      new InputText({
        key: 'description',
        label: 'Mô tả',
        value: this.data.description,
        order: 3
      }),
      new InputText({
        key: 'id',
        label: '',
        value: this.data.id.toString(),
        type: 'hidden',
        order: 4
      }),
    ];
    this.arrinput = dataIP;
  }
  onSubmit() {
    let data_edit = JSON.parse(JSON.stringify(this.form.value));
    console.log(data_edit);
    let value_save: mdmajors = {
      id: 0,
      majorscode: '',
      majorsname: '',
      description: ''
    };
    value_save.id = Number(data_edit['id']);
    value_save.majorscode = data_edit['majorscode'];
    value_save.majorsname = data_edit['majorsname'];
    value_save.description = data_edit['description'];
    if (data_edit['isactive'] !== '' && data_edit['isactive'] !== undefined) {
      value_save.isactive = data_edit['isactive']['key'].toString() === 'true';
    }
    console.log(value_save);
    let thongbao = 'Có lỗi trong quá trình lưu dữ liệu!';
    if (value_save.id === 0) {
      this.mdmajorsSrv.add_mdmajors(value_save).subscribe(t => {
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
      this.mdmajorsSrv.update_mdmajors(value_save).subscribe(t => {
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
