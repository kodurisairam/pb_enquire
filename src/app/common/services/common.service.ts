import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import * as S3 from 'aws-sdk/clients/s3';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  fileRequest;
  constructor() { }

  uploadFile(file, bucketName: string): Observable<any> {
    let fileUpload = new Observable((observer) => {
      const contentType = file.type;
      const bucket = new S3(
        {
          accessKeyId: 'AKIAV2TWAWZYHGR6BLVR',
          secretAccessKey: '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',
          region:'ap-south-1'
        }
      );
      const params = {
        Bucket: bucketName,
        Key: 'pb' + '-' + Math.floor((Math.random() * 1000)) + Date.now(),
        Body: file,
        ACL: 'public-read',
        ContentType: contentType,
        
      };

      this.fileRequest = bucket.upload(params).on('httpUploadProgress', function (evt) {
        observer.next({ type: 0, value: evt });
      });

      this.fileRequest.send(function (err, data) {
        if (err) {
          observer.error({ type: 2, value: err });
        } else {
          observer.next({ type: 1, value: data.Key });
        }
      });
    })
    return fileUpload;
  }

  cancelUpload(): void {
    setTimeout(this.fileRequest.abort.bind(this.fileRequest), 1000);
  }
}
