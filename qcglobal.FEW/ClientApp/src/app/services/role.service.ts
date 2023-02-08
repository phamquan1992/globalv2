import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { result_object } from '../models/branch';
import { role } from '../models/role';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class roleService {

  constructor(private dataSrv: DataService) { }
  _api = 'roles';

  get_list() {
    return this.dataSrv.get(this._api + '/getrole/') as Observable<role[]>;
  }
  get_byid(id: number) {
    return this.dataSrv.get(this._api + '/GetByID/' + id);
  }
  add_role(role_obj: role) {
    return this.dataSrv.post(this._api + '/addrole', role_obj) as Observable<result_object>;
  }
  update_role(role_obj: role) {
    return this.dataSrv.put(this._api +'/updaterole/', role_obj) as Observable<result_object>;
  }
  update_status(arr_role: role[]) {
    return this.dataSrv.put(this._api +'/ChangeStatus', arr_role);
  }
  delete_obj(id: string) {
    return this.dataSrv.delete(this._api +'/deleterole', id) as Observable<result_object>;
  }
  delete_arr(arr_id: number[]) {
    return this.dataSrv.delete_array(this._api + '/deleterole', arr_id) as Observable<result_object>;
  }
  f5_service() {
    return this.dataSrv.Refeshrequired;
  }
}
