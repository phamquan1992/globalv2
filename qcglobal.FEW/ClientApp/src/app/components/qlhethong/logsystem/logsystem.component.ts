import { Component, OnInit } from '@angular/core';
export interface item_log {
  action_name: string;
  action_time: string;
  action_dec: string;
}
@Component({
  selector: 'app-logsystem',
  templateUrl: './logsystem.component.html',
  styleUrls: ['./logsystem.component.css']
})
export class LogsystemComponent implements OnInit {
  arr_time: item_log[] = [];
  ngOnInit(): void {
    for (let index = 0; index < 10; index++) {
      let gt_tmp: item_log = {
        action_name: 'Chức năng ' + index,
        action_time: '05/01/2023',
        action_dec: 'Thực hiện chức năng ' + index
      };
      this.arr_time.push(gt_tmp);
    }
  }
  xem_them() {
    for (let index = 0; index < 10; index++) {
      let gt_tmp: item_log = {
        action_name: 'Chức năng ' + this.arr_time.length,
        action_time: '05/01/2023',
        action_dec: 'Thực hiện chức năng ' + this.arr_time.length
      };
      this.arr_time.push(gt_tmp);
    }
  }

}
