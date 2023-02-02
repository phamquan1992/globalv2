import { HttpClient, HttpEventType, HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { DataService } from 'src/app/services/data.service';
import { UploadImageService } from 'src/app/services/uploadimage.service';
@Component({
  selector: 'app-uploadimage',
  templateUrl: './uploadimage.component.html',
  styleUrls: ['./uploadimage.component.css']
})
export class UploadimageComponent {
  // progress: number;
  // message: string;
  @Output() public onUploadFinished = new EventEmitter();

  constructor(private http: HttpClient, private uploadService: UploadImageService,private dataSrv: DataService) { }
  ngOnInit() {
  }
  uploadFile = (files: any) => {
    if (files.length === 0) {
      return;
    }
    let fileToUpload = <File>files[0];
    const formData = new FormData();
    formData.append('file', fileToUpload, fileToUpload.name);

    this.http.post('https://localhost:5001/api/imagehandlers', formData, {reportProgress: true, observe: 'events'})
      .subscribe({
        next: (event) => {
        if (event.type === HttpEventType.UploadProgress)
          //this.progress = Math.round(100 * event.loaded / event.total);
          console.log(event.loaded)
        else if (event.type === HttpEventType.Response) {
          //this.message = 'Upload success.';
          this.onUploadFinished.emit(event.body);
        }
      },
      error: (err: HttpErrorResponse) => console.log(err)
    });

    //this.http.post('https://localhost:5001/api/ImageHandlers/upload', formData, {reportProgress: true, observe: 'events'})
    // this.uploadService.upload(formData, {reportProgress: true, observe: 'events'}).subscribe({
    //     next: (event) => {
    //     if (event.type === HttpEventType.UploadProgress)
    //       //this.progress = Math.round(100 * event.loaded / event.total);
    //       console.log(event.loaded)
    //     else if (event.type === HttpEventType.Response) {
    //       //this.message = 'Upload success.';
    //       this.onUploadFinished.emit(event.body);
    //     }
    //   },
    //   error: (err: HttpErrorResponse) => console.log(err)
    // });
  }
}
