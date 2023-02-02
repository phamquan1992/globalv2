import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { result_object } from '../models/branch';
import { employee } from '../models/employee';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private dataSrv: DataService) { }
  _api = 'employees';

  get_list() {
    return this.dataSrv.get('employees') as Observable<employee[]>;
  }
  get_byid(id: number) {
    return this.dataSrv.get(this._api + '/GetByID/' + id);
  }
  add_employee(employee_obj: employee) {
    return this.dataSrv.post(this._api + '/Add', employee_obj) as Observable<result_object>;
  }
  update_employee(employee_obj: employee) {
    return this.dataSrv.put(this._api +'/Update/', employee_obj) as Observable<result_object>;
  }
  update_status(arr_employee: employee[]) {
    return this.dataSrv.put(this._api +'/ChangeStatus', arr_employee);
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
