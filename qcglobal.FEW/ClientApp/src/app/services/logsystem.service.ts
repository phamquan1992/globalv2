import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { result_object } from '../models/branch';
import { logsystem } from '../models/logsystem';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class LogsystemService {

  constructor(private dataSrv: DataService) { }
  _api = 'logsystem';

  get_list() {
    return this.dataSrv.get('logsystem') as Observable<logsystem[]>;
  }
  get_byid(id: number) {
    return this.dataSrv.get(this._api + '/GetByID/' + id);
  }
  add_logsystem(logsystem_obj: logsystem) {
    return this.dataSrv.post(this._api + '/Add', logsystem_obj) as Observable<result_object>;
  }
  f5_service() {
    return this.dataSrv.Refeshrequired;
  }
}
