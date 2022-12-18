import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { result_object } from '../models/branch';
import { mdmajors } from '../models/mdmajors';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class MdmajorsService {

  constructor(private dataSrv: DataService) { }
  _api = 'mdmajors';

  get_list() {
    return this.dataSrv.get('mdmajors') as Observable<mdmajors[]>;
  }
  get_byid(id: number) {
    return this.dataSrv.get(this._api + '/GetByID/' + id);
  }
  add_mdmajors(mdmajors_obj: mdmajors) {
    return this.dataSrv.post(this._api + '/Add', mdmajors_obj) as Observable<result_object>;
  }
  update_mdmajors(mdmajors_obj: mdmajors) {
    return this.dataSrv.put(this._api +'/Update/', mdmajors_obj) as Observable<result_object>;
  }
  update_status(arr_mdmajors: mdmajors[]) {
    return this.dataSrv.put(this._api +'/ChangeStatus', arr_mdmajors);
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
