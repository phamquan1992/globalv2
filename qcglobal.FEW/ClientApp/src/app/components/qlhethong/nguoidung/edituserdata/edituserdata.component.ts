import { InputPassword } from './../../../../models/inputpassword';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { userdata } from 'src/app/models/userdata';
import { InputControlService } from 'src/app/services/input-control.service';
import { MessageService } from 'src/app/services/message.service';
import { userdataService } from 'src/app/services/userdata.service';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { role } from 'src/app/models/role';

@Component({
  selector: 'app-edituserdata',
  templateUrl: './edituserdata.component.html',
  styleUrls: ['./edituserdata.component.css']
})
export class EdituserdataComponent {
  constructor(public dialogRef: MatDialogRef<EdituserdataComponent>, @Inject(MAT_DIALOG_DATA) public data: userdata,private messageSrv: MessageService,
   private controlSrv: InputControlService,private userdataSrv: userdataService) {

  }
  lstRole : any;

  public password!: '' ;
  public repassword!: '';

  arr_role: role[] = [];
  notIncludeRole = [
    'Chưa tồn tại trong người dùng'
  ];

  includedRole = [
    'Cập nhật trong người dùng'
  ];

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      this.lstRole = event.container.data;
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      this.lstRole = event.container.data;
    }
  }

  arrinput: Inputbase<string>[] = [];
  form!: FormGroup;
  tieu_de = 'Cập nhật người dùng';
  eventSelection(event: any){
    console.log(event)
  }

  ngOnInit(): void {
    this.set_data();
    this.form = this.controlSrv.toFormGroup(this.arrinput as Inputbase<string>[]);
  }

  set_data() {
    let arr_status = [{ key: '1', value: 'Đã Kích hoạt' }, { key: '0', value: 'Chưa kích hoạt' }];
    let arr_isadmin = [{ key: '1', value: 'Có' }, { key: '0', value: 'Không' }];

    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'username',
        label: 'Tên người dùng',
        value: this.data.username,
        required: true,
        order: 1
      }),
      // new InputText({
      //   key: 'password',
      //   label: 'Password',
      //   value: this.data.password,
      //   required: true,
      //   order: 1
      // }),
      new InputText({
        key: 'serialtoken',
        label: 'Serialtoken',
        value: this.data.serialtoken,
        //required: true,
        order: 1
      }),
      new InputDropdown({
        key: 'email',
        label: 'Email',
        required: true,
        options: this.data.list_email,
        value: this.data.email !== null && this.data.email !== undefined ? this.data.email?.toString() : '',
        order: 9
      }),

      new InputDropdown({
        key: 'isadmin',
        label: 'Là quản trị hệ thống',
        options: arr_isadmin,
        value: this.data.isadmin === 0 ? '0' : '1',
        order: 4
      }),
      new InputDropdown({
        key: 'status',
        label: 'Trạng thái',
        options: arr_status,
        value: this.data.status === 0 ? '0' : '1',
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
    if (this.data.lstroleid != undefined && this.data.list_role && this.data.list_role.length > 0) {
      let arr_permissionid = this.data.lstroleid.split(",");
      this.data.list_role.forEach(item => {
        if (arr_permissionid.includes(item.key)) {
          this.includedRole.unshift(item.value)
        }
        else {
          this.notIncludeRole.unshift(item.value)
        }
      });
    }


  }
  onSubmit() {

      let tmp_arrRole: String[] = [];
    let cloneincludedRole = JSON.parse(JSON.stringify(this.includedRole));
    if (this.data.id === 0) {
      if (cloneincludedRole != undefined && cloneincludedRole.length > 1 && this.data.list_role) {
        this.data.list_role.forEach((x) => {
          if (cloneincludedRole.includes(x.value)) {
            tmp_arrRole.push(x.key);
          }
        });
      }
    }
    else {
      if (cloneincludedRole != undefined && cloneincludedRole.length == 1  && this.data.lstroleid != undefined) {
        tmp_arrRole = [];
      }
      else {
        if (cloneincludedRole != undefined && cloneincludedRole.length > 1 && this.data.list_role) {
          this.data.list_role.forEach((x) => {
            if (cloneincludedRole.includes(x.value)) {
              tmp_arrRole.push(x.key);
            }
          });
        }
      }
    }

    let data_edit = JSON.parse(JSON.stringify(this.form.value));
    let value_save: userdata = {
      id: 0,
      username: '',
      password: '',
      email: '',
      serialtoken:'',
      isadmin:0,
      status: 0,
      lstroleid: ''
    };
    value_save.id = Number(data_edit['id']);
    value_save.username = data_edit['username'];
    value_save.password = this.password;
    //value_save.email = data_edit['email'];
    value_save.serialtoken = data_edit['serialtoken'];

    if (data_edit['status'] !== '' && data_edit['status'] !== undefined) {
      value_save.status = Number(data_edit['status']['key']);
    }

    if (data_edit['isadmin'] !== '' && data_edit['isadmin'] !== undefined) {
      value_save.isadmin = Number(data_edit['isadmin']['key']);
    }

    if (data_edit['email'] !== '' && data_edit['email'] !== undefined) {
      value_save.email = data_edit['email']['key'];
    }

    value_save.lstroleid = tmp_arrRole.toString();

    let thongbao = 'Có lỗi trong quá trình lưu dữ liệu!';
    if (value_save.id === 0) {
      if (!this.errpass){
        this.userdataSrv.add_userdata(value_save).subscribe(t => {
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
      else{
        this.messageSrv.error('Kiểm tra lại thông tin mật khẩu');
      }

    } else {
      if(value_save.password === undefined ){
        value_save.password = this.data.password;
      }
      this.userdataSrv.update_userdata(value_save).subscribe(t => {
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

  public errpass: boolean = true;

  blurPassword(event: any){
    let box = document.getElementById('errNull');
    if(event.target.value == ''){
      if (box != null) {
        box.style.setProperty('display', 'inline-block');
      }
      this.errpass = true;
    }
    else{
      if (box != null) {
        box.style.setProperty('display', 'none');
      }
      this.password = event.target.value;
      this.errpass = false;
    }
  }

  blurRePassword(event: any){
    let box = document.getElementById('errNotMapPass');
    if(event.target.value != this.password){
      if (box != null) {
        box.style.setProperty('display', 'inline-block');
      }
      this.errpass = true;
    }
    else{
      if (box != null) {
        box.style.setProperty('display', 'none');
      }
      this.repassword = event.target.value;
      this.errpass = false;
    }
  }

}

