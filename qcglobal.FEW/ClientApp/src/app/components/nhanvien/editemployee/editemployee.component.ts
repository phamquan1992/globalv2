
import { EmployeeService } from './../../../services/employee.service';
import { employee } from 'src/app/models/employee';
import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Inputbase } from 'src/app/models/input-base';
import { InputDropdown } from 'src/app/models/inputdropdown';
import { InputText } from 'src/app/models/inputtext';
import { InputControlService } from 'src/app/services/input-control.service';
import { MessageService } from 'src/app/services/message.service';

@Component({
  selector: 'app-editemployee',
  templateUrl: './editemployee.component.html',
  styleUrls: ['./editemployee.component.css']
})
export class EditemployeeComponent {
  constructor(public dialogRef: MatDialogRef<EditemployeeComponent>, @Inject(MAT_DIALOG_DATA) public data: employee, private EmployeeService: EmployeeService,
    private controlSrv: InputControlService, private messageSrv: MessageService) { }

  public responseImage!: { dbPath: ''; };
  arrinput: Inputbase<string>[] = [];
  form!: FormGroup;
  tieu_de = 'Cập nhật nhân viên';
  dateOfBirth: any
  ngOnInit(): void {
    this.set_data();
    this.createImgPath("");
    this.form = this.controlSrv.toFormGroup(this.arrinput as Inputbase<string>[]);
  }
  uploadFinished = (event: { dbPath: ""; }) => {
    this.data.image = event.dbPath;
  }
  public createImgPath = (serverPath: string) => {
    if (serverPath === undefined || serverPath === "")
    {
      serverPath = "Resources/Images/default_img.png";
    }
    return `https://localhost:5001/${serverPath}`;
  }
  set_data() {

    let arr_status = [{ key: '1', value: 'Đang làm việc' }, { key: '0', value: 'Đã nghỉ việc' }];
    let dataIP: Inputbase<string>[] = [
      new InputText({
        key: 'employeeCode',
        label: 'Mã nhân viên',
        value: this.data.employeeCode,
        required: true,
        order: 1
      }),
      new InputText({
        key: 'employeeName',
        label: 'Tên nhân viên',
        value: this.data.employeeName,
        required: true,
        order: 2
      }),
      new InputText({
        key: 'dateOfBirth',
        label: 'Ngày sinh',
        value: this.data.dateOfBirth?.toString(),
        order: 3
      }),
      new InputText({
        key: 'sex',
        label: 'Giới tính',
        value: this.data.sex?.toString(),
        order: 4
      }),
      new InputText({
        key: 'email',
        label: 'Email',
        value: this.data.email,
        order: 5
      }),
      new InputText({
        key: 'telephone',
        label: 'Số điện thoại',
        value: this.data.telephone,
        order: 6
      }),

      new InputText({
        key: 'address',
        label: 'Địa chỉ hiện tại',
        value: this.data.address,
        order: 7
      }),

      new InputDropdown({
        key: 'titleID',
        label: 'Chức vụ',
        options: this.data.list_title,
        value: this.data.titleID !== null && this.data.titleID !== 0 ? this.data.titleID?.toString() : '',
        order: 8
      }),
      new InputDropdown({
        key: 'mdTeamsID',
        label: 'Nhóm dự án',
        options: this.data.list_mdteam,
        value: this.data.mdTeamsID !== null && this.data.mdTeamsID !== 0 ? this.data.mdTeamsID?.toString() : '',
        order: 9
      }),
      new InputText({
        key: 'probationaryPeriod',
        label: 'Ngày thử việc',
        value: this.data.probationaryPeriod?.toString(),
        order: 10
      }),
      new InputText({
        key: 'officialBusinessDay',
        label: 'Ngày chính thức',
        value: this.data.officialBusinessDay?.toString(),
        order: 11
      }),
      new InputDropdown({
        key: 'status',
        label: 'Tình trạng công việc',
        options: arr_status,
        value: this.data.status === 0 ? '0' : '1',
        order: 12
      }),

      // tab thong tin phap ly
      new InputText({
        key: 'nation',
        label: 'Dân tộc',
        value: this.data.nation,
        order: 13
      }),
      new InputText({
        key: 'religion',
        label: 'Tôn giáo',
        value: this.data.religion,
        order: 14
      }),
      new InputText({
        key: 'nativeCountry',
        label: 'Nguyên quán',
        value: this.data.nativeCountry,
        order: 14
      }),
      new InputText({
        key: 'identityCard',
        label: 'Số CMND/TCC',
        value: this.data.identityCard,
        order: 15
      }),
      new InputText({
        key: 'placeIssueIDCard',
        label: 'Nơi cấp',
        value: this.data.placeIssueIDCard,
        order: 16
      }),
      new InputText({
        key: 'dateIssueIDCard',
        label: 'Ngày cấp',
        value: this.data.dateIssueIDCard?.toString(),
        order: 17
      }),
      new InputText({
        key: 'education',
        label: 'Trình độ văn hóa',
        value: this.data.education,
        order: 18
      }),
      new InputText({
        key: 'foreignLanguage',
        label: 'Ngoại ngữ',
        value: this.data.foreignLanguage,
        order: 19
      }),
      new InputText({
        key: 'professionalQualification',
        label: 'Trình độ chuyên môn',
        value: this.data.professionalQualification,
        order: 20
      }),

      // tab thong tin quan he gia dinh
      new InputText({
        key: 'fatherName',
        label: 'Họ tên cha',
        value: this.data.fatherName,
        order: 21
      }),
      new InputText({
        key: 'fatherDateOfBirth',
        label: 'Năm sinh',
        value: this.data.fatherDateOfBirth?.toString(),
        order: 22
      }),
      new InputText({
        key: 'fatherAddress',
        label: 'Chỗ ở hiện nay',
        value: this.data.fatherAddress,
        order: 23
      }),
      new InputText({
        key: 'fatherContact',
        label: 'SĐT liên hệ',
        value: this.data.fatherContact,
        order: 24
      }),

      new InputText({
        key: 'motherName',
        label: 'Họ tên mẹ',
        value: this.data.motherName,
        order: 25
      }),
      new InputText({
        key: 'motherDateOfBirth',
        label: 'Năm sinh',
        value: this.data.motherDateOfBirth?.toString(),
        order: 26
      }),
      new InputText({
        key: 'motherAddress',
        label: 'Chỗ ở hiện nay',
        value: this.data.motherAddress,
        order: 27
      }),
      new InputText({
        key: 'motherContact',
        label: 'SĐT liên hệ',
        value: this.data.motherContact,
        order: 28
      }),

      new InputText({
        key: 'siblingsName',
        label: 'Họ tên anh/chị/em',
        value: this.data.siblingsName,
        order: 29
      }),
      new InputText({
        key: 'siblingsDateOfBirth',
        label: 'Năm sinh',
        value: this.data.siblingsDateOfBirth?.toString(),
        order: 30
      }),
      new InputText({
        key: 'siblingsAddress',
        label: 'Chỗ ở hiện nay',
        value: this.data.siblingsAddress,
        order: 31
      }),
      new InputText({
        key: 'siblingsContact',
        label: 'SĐT liên hệ',
        value: this.data.siblingsContact,
        order: 32
      }),

      new InputText({
        key: 'id',
        label: '',
        value: this.data.id.toString(),
        type: 'hidden',
        order: 100
      }),
    ];
    this.arrinput = dataIP;
  }
  onSubmit() {
    let data_edit = JSON.parse(JSON.stringify(this.form.value));
    const now = new Date();
    let value_save: employee = {
      id: 0,
      employeeCode: '',
      employeeName: '',
      address: '',
      sex: 0,
      image: '',
      email: '',
      telephone: '',
      dateOfBirth: now,
      mdTeamsID: 0,
      titleID: 0,
      probationaryPeriod: now,
      officialBusinessDay: now,
      status: 0,
      nation: '',
      religion: '',
      nativeCountry: '',
      identityCard: '',
      placeIssueIDCard: '',
      dateIssueIDCard: now,
      education: '',
      foreignLanguage: '',
      professionalQualification: '',
      fatherName: '',
      fatherDateOfBirth: now,
      fatherAddress: '',
      fatherContact: '',
      motherName: '',
      motherDateOfBirth: now,
      motherAddress: '',
      motherContact: '',
      siblingsName: '',
      siblingsDateOfBirth: now,
      siblingsAddress: '',
      siblingsContact: ''
    };
    value_save.id = Number(data_edit['id']);
    value_save.employeeCode = data_edit['employeeCode'];
    value_save.employeeName = data_edit['employeeName'];

    value_save.address = data_edit['address'];
    //value_save.sex = data_edit['sex'];
    //value_save.image = data_edit['image'];
    value_save.email = data_edit['email'];
    value_save.telephone = data_edit['telephone'];
    //value_save.mDTeamsID = data_edit['mDTeamsID'];
    //value_save.titleID = data_edit['titleID'];
    //value_save.status = data_edit['employeeName'];
    value_save.nation = data_edit['nation'];
    value_save.religion = data_edit['religion'];
    value_save.nativeCountry = data_edit['nativeCountry'];
    value_save.identityCard = data_edit['identityCard'];
    value_save.placeIssueIDCard = data_edit['placeIssueIDCard'];
    value_save.education = data_edit['education'];
    value_save.foreignLanguage = data_edit['foreignLanguage'];
    value_save.professionalQualification = data_edit['professionalQualification'];
    value_save.fatherName = data_edit['fatherName'];
    value_save.fatherAddress = data_edit['fatherAddress'];
    value_save.fatherContact = data_edit['fatherContact'];
    value_save.motherName = data_edit['motherName'];
    value_save.motherAddress = data_edit['motherAddress'];
    value_save.motherContact = data_edit['motherContact'];
    value_save.siblingsName = data_edit['siblingsName'];
    value_save.siblingsAddress = data_edit['siblingsAddress'];
    value_save.siblingsContact = data_edit['siblingsContact'];
    debugger;
    if (data_edit['status'] !== '' && data_edit['status'] !== undefined) {
      value_save.status = Number(data_edit['status']['key']);
    }
    if (data_edit['mdTeamsID'] !== '' && data_edit['mdTeamsID'] !== undefined) {
      value_save.mdTeamsID = Number(data_edit['mdTeamsID']['key']);
    }
    if (data_edit['titleID'] !== '' && data_edit['titleID'] !== undefined) {
      value_save.titleID = Number(data_edit['titleID']['key']);
    }
    let thongbao = 'Có lỗi trong quá trình lưu dữ liệu!';
    debugger;
    if (value_save.id === 0) {
      this.EmployeeService.add_employee(value_save).subscribe(t => {
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
      this.EmployeeService.update_employee(value_save).subscribe(t => {
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
