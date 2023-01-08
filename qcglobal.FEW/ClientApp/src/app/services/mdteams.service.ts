import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { result_object } from '../models/branch';
import { mdteams } from '../models/mdteams';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class mdteamsService {

  constructor(private dataSrv: DataService) { }
  _api = 'mdteams';

  get_list() {
    return this.dataSrv.get('mdteams') as Observable<mdteams[]>;
  }
  get_byid(id: number) {
    return this.dataSrv.get(this._api + '/GetByID/' + id);
  }
  add_mdteams(mdteams_obj: mdteams) {
    return this.dataSrv.post(this._api + '/Add', mdteams_obj) as Observable<result_object>;
  }
  update_mdteams(mdteams_obj: mdteams) {
    return this.dataSrv.put(this._api +'/Update/', mdteams_obj) as Observable<result_object>;
  }
  update_status(arr_mdteams: mdteams[]) {
    return this.dataSrv.put(this._api +'/ChangeStatus', arr_mdteams);
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
