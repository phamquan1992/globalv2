import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { result_object } from '../models/branch';
import { roles } from '../models/roles';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  constructor(private dataSrv: DataService) { }
  _api = 'roles';

  get_list() {
    return this.dataSrv.get('roles') as Observable<roles[]>;
  }
  get_byid(id: number) {
    return this.dataSrv.get(this._api + '/GetByID/' + id);
  }
  add_roles(roles_obj: roles) {
    return this.dataSrv.post(this._api + '/Add', roles_obj) as Observable<result_object>;
  }
  update_roles(roles_obj: roles) {
    return this.dataSrv.put(this._api +'/Update/', roles_obj) as Observable<result_object>;
  }
  update_status(arr_roles: roles[]) {
    return this.dataSrv.put(this._api +'/ChangeStatus', arr_roles);
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
