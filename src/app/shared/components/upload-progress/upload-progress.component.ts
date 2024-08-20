import { Component, OnInit, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from 'src/app/common/services/common.service';
import { FileSizePipe } from '../../pipe/file-size.pipe';

@Component({
  selector: 'rsb-upload-progress',
  templateUrl: './upload-progress.component.html',
  styleUrls: ['./upload-progress.component.css']
})
export class UploadProgressComponent implements OnInit {
  @Input() file: any;
  progress: number = 0;
  fileSize: string;
  error: boolean = false;
  constructor(
    private activeModal: NgbActiveModal,
    private commonService: CommonService,
    private fileSizePipe: FileSizePipe
  ) { }

  ngOnInit() {
    const bucket = 'pillarsnewapp';
    this.commonService.uploadFile(this.file, bucket).subscribe((rsp) => {
      this.callback(rsp, bucket);
    }, (err) => {
      if (bucket !== 'pillarsnewapp') {
        this.retryUpload('pillarsnewapp');
      } else {
        this.error = true;
      }
    });
  }

  callback = (rsp, bucketName) => {
    if (rsp.type === 0) {
      const evt = rsp.value;
      this.progress = Math.round(evt.loaded / evt.total * 100);
      this.fileSize = this.fileSizePipe.transform(evt.loaded) + ' of ' + this.fileSizePipe.transform(evt.total);
    }
    else {
      let path: string = '';
      path = 'https://d1tcpzzcuv60ry.cloudfront.net/' + rsp.value;
      this.close(path);
    }
  };

  retryUpload(bucketName: string): void {
    this.commonService.uploadFile(this.file, bucketName).subscribe((rsp) => {
      this.callback(rsp, bucketName);
    }, (err) => this.error = true);
  }

  close(rsn?: any): void {
    this.activeModal.close(rsn);
  }

  cancel(): void {
    this.commonService.cancelUpload();
    this.close();
  }

}
