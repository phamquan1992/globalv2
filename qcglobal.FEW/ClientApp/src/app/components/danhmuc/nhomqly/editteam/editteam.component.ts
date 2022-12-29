import { mdteams } from './../../../../models/mdteams';
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
  selector: 'app-editteam',
  templateUrl: './editteam.component.html',
  styleUrls: ['./editteam.component.css']
})
export class EditteamComponent  {
  constructor(public dialogRef: MatDialogRef<EditteamComponent>, @Inject(MAT_DIALOG_DATA) public data: mdteams, private controlSrv: InputControlService,
    private branchSrv: BranchService, private messageSrv: MessageService) { }
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
    let arr_leader = [{ key: '1', value: 'leader 1' }, { key: '2', value: 'leader 2' }];
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
        key: 'leaderId',
        label: 'Leader',
        options: arr_leader,
        //value: this.data.obj_edit.branchid !== null && this.data.obj_edit.branchid !== 0 ? this.data.obj_edit.branchid.toString() : '',
        order: 3
      }),
      new InputText({
        key: 'description',
        label: 'Mô tả',
        value: this.data.description,
        order: 4
      })
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
      description: ''
    };
    value_save.id = Number(data_edit['id']);
    value_save.teamcode = data_edit['teamcode'];
    value_save.teamname = data_edit['teamname'];
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
