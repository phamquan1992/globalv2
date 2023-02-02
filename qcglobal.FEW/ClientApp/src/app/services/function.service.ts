import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { result_object } from '../models/branch';
import { functions } from '../models/functions';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class FunctionService {

  constructor(private dataSrv: DataService) { }
  _api = 'function';

  get_list() {
    return this.dataSrv.get('function') as Observable<functions[]>;
  }
  get_byid(id: number) {
    return this.dataSrv.get(this._api + '/GetByID/' + id);
  }
  add_function(function_obj: functions) {
    return this.dataSrv.post(this._api + '/Add', function_obj) as Observable<result_object>;
  }
  update_function(function_obj: functions) {
    return this.dataSrv.put(this._api +'/Update/', function_obj) as Observable<result_object>;
  }
  update_status(arr_function: functions[]) {
    return this.dataSrv.put(this._api +'/ChangeStatus', arr_function);
  }
  delete_obj(id: string) {
    return this.dataSrv.delete(this._api +'/delete', id) as Observable<result_object>;
  }
  delete_arr(arr_id: number[]) {
    return this.dataSrv.delete_array(this._api + '/delete', arr_id) as Observable<result_object>;
  }
  f5_service() {
    return this.dataSrv.Refeshrequired;
  }
}
