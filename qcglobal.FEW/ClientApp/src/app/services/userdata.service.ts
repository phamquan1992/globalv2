import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { result_object } from '../models/branch';
import { userdata } from '../models/userdata';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class userdataService {

  constructor(private dataSrv: DataService) { }
  _api = 'userdata';

  get_list() {
    return this.dataSrv.get(this._api + '/getuser/') as Observable<userdata[]>;
  }
  get_byid(id: number) {
    return this.dataSrv.get(this._api + '/GetByID/' + id);
  }
  add_userdata(userdata_obj: userdata) {
    return this.dataSrv.post(this._api + '/adduser', userdata_obj) as Observable<result_object>;
  }
  update_userdata(userdata_obj: userdata) {
    return this.dataSrv.put(this._api +'/updateuser/', userdata_obj) as Observable<result_object>;
  }
  update_status(arr_userdata: userdata[]) {
    return this.dataSrv.put(this._api +'/ChangeStatus', arr_userdata);
  }
  delete_obj(id: string) {
    return this.dataSrv.delete(this._api +'/deleteuser', id) as Observable<result_object>;
  }
  delete_arr(arr_id: number[]) {
    return this.dataSrv.delete_array(this._api + '/deleteuser', arr_id) as Observable<result_object>;
  }
  f5_service() {
    return this.dataSrv.Refeshrequired;
  }
}
