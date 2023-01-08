import { mdteams } from './../../../../models/mdteams';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { InputControlService } from 'src/app/services/input-control.service';
import { MessageService } from 'src/app/services/message.service';
import { mdteamsService } from './../../../../services/mdteams.service';
@Component({
  selector: 'app-editteam',
  templateUrl: './editteam.component.html',
  styleUrls: ['./editteam.component.css']
})
export class EditteamComponent  {
  constructor(public dialogRef: MatDialogRef<EditteamComponent>, @Inject(MAT_DIALOG_DATA) public data: mdteams,  private mdteamsService: mdteamsService,
   private controlSrv: InputControlService, private messageSrv: MessageService) { }
  arrinput: Inputbase<string>[] = [];
  form!: FormGroup;
  tieu_de = 'Cập nhật team';
  ngOnInit(): void {
    console.log(JSON.stringify(this.data));
    this.set_data();
    this.form = this.controlSrv.toFormGroup(this.arrinput as Inputbase<string>[]);
  }
  set_data() {
    let arr_status = [{ key: 'true', value: 'Kích hoạt' }, { key: 'false', value: 'Huỷ kích hoạt' }];
    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'teamcode',
        label: 'Mã team',
        value: this.data.teamcode,
        required: true,
        order: 1
      }),
      new InputText({
        key: 'teamname',
        label: 'Tên team',
        value: this.data.teamname,
        required: true,
        order: 2
      }),
      new InputDropdown({
        key: 'isactive',
        label: 'Trạng thái',
        options: arr_status,
        value: this.data.isactive === true ? 'true' : 'false',
        order: 3
      }),
      new InputText({
        key: 'description',
        label: 'Mô tả',
        value: this.data.description,
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
    let value_save: mdteams = {
      id: 0,
      teamcode: '',
      teamname: '',
      description: '',
      isactive: false
    };
    value_save.id = Number(data_edit['id']);
    value_save.teamcode = data_edit['teamcode'];
    value_save.teamname = data_edit['teamname'];
    value_save.description = data_edit['description'];
    value_save.isactive = data_edit['isactive'];
    if (data_edit['isactive'] !== '' && data_edit['isactive'] !== undefined) {
      value_save.isactive = data_edit['isactive']['key'].toString() === 'true';
    }
    let thongbao = 'Có lỗi trong quá trình lưu dữ liệu!';
    if (value_save.id === 0) {
      this.mdteamsService.add_mdteams(value_save).subscribe(t => {
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
      this.mdteamsService.update_mdteams(value_save).subscribe(t => {
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
