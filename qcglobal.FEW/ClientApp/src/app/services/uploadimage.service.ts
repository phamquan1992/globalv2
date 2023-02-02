import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { result_object } from '../models/branch';
import { DataService } from './data.service';

@Injectable({
  providedIn: 'root'
})
export class UploadImageService {

  constructor(private dataSrv: DataService) { }
  _api = 'imagehandlers';

  upload(file: any, nothing: any) {
    return this.dataSrv.post(this._api + '/upload', file) as Observable<result_object>;
  }

}
