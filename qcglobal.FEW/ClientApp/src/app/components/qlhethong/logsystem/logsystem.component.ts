import { logsystem } from './../../../models/logsystem';
import { Component, OnInit } from '@angular/core';
import { LogsystemService } from 'src/app/services/logsystem.service';
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
  arr_log: logsystem[] = [];
  arr_totallog: logsystem[] = [];
  startIndex = 1;

  constructor(private logsystemSrv: LogsystemService) {

  }

  ngOnInit(): void {
    this.startIndex = 1;
    this.logsystemSrv.get_list().subscribe(logsystem => {
      debugger;
      this.arr_totallog = logsystem;
      this.arr_log = logsystem.slice(0,10);
    });

  }
  xem_them() {
    this.startIndex += 1;
    this.arr_log = this.arr_totallog.slice(0, this.startIndex*10 - 1)
  }

}
