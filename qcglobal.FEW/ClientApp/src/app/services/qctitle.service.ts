import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { result_object } from '../models/branch';
import { qc_title } from '../models/qc_title';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class QcTitleService {

  constructor(private dataSrv: DataService) { }
  _api = 'title';

  get_list() {
    return this.dataSrv.get(this._api) as Observable<qc_title[]>;
  }
  get_byid(id: number) {
    return this.dataSrv.get(this._api + '/GetByID/' + id);
  }
  add_qctitle(qctitle_obj: qc_title) {
    return this.dataSrv.post(this._api + '/Add', qctitle_obj) as Observable<result_object>;
  }
  update_qctitle(qctitle_obj: qc_title) {
    return this.dataSrv.put(this._api +'/Update/', qctitle_obj) as Observable<result_object>;
  }
  update_status(arr_qctitle: qc_title[]) {
    return this.dataSrv.put(this._api +'/ChangeStatus', arr_qctitle);
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
