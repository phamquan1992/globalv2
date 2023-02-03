import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { result_object } from '../models/branch';
import { permission } from '../models/permission';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class PermissionService {

  constructor(private dataSrv: DataService) { }
  _api = 'permission';

  get_list() {
    return this.dataSrv.get('permission') as Observable<permission[]>;
  }
  get_byid(id: number) {
    return this.dataSrv.get(this._api + '/GetByID/' + id);
  }
  add_permission(permission_obj: permission) {
    return this.dataSrv.post(this._api + '/Add', permission_obj) as Observable<result_object>;
  }
  update_permission(permission_obj: permission) {
    return this.dataSrv.put(this._api +'/Update/', permission_obj) as Observable<result_object>;
  }
  update_status(arr_permission: permission[]) {
    return this.dataSrv.put(this._api +'/ChangeStatus', arr_permission);
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
