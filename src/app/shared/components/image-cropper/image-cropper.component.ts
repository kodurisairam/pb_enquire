import { Component, OnInit, Input } from '@angular/core';
import { ImageCroppedEvent, ImageTransform, base64ToFile } from 'ngx-image-cropper';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';

@Component({
    selector: 'app-image-cropper',
    templateUrl: './image-cropper.component.html',
    styleUrls: ['./image-cropper.component.css']
})
export class ImageCropperComponent implements OnInit {
    @Input() imageChangedEvent: any = '';
    croppedImage: any = '';
    outputFile: any;
    canvasRotation = 0;
    rotation = 0;
    scale = 1;
    transform: ImageTransform = {};
    origWidth;
    origHeight;
    markDefault;
    constructor(
        private activeModal: NgbActiveModal,
        private toastrService: ToastrService
    ) {}

    ngOnInit() {
        this.fileChangeEvent(this.imageChangedEvent);
     }

    fileChangeEvent(event: any): void {
        this.imageChangedEvent = event;
    }
    imageCropped(event: ImageCroppedEvent) {
        this.croppedImage = event.base64;
        this.outputFile = base64ToFile(this.croppedImage);
    }

    imageLoaded(image: any) {
        // show cropper
        if(image.original && image.original.size) {
            this.origWidth = image.original.size.width;
            this.origHeight = image.original.size.height;
        }
        if (this.origHeight < 550|| this.origWidth < 800) {
            this.toastrService.error('Please select an Image with minimum 800 * 550 size.');
            this.close();
        }
    }
    cropperReady() {
        // cropper ready
    }
    loadImageFailed() {
        // show message
    }

    rotateLeft() {
        this.canvasRotation--;
        this.flipAfterRotate();
    }

    rotateRight() {
        this.canvasRotation++;
        this.flipAfterRotate();
    }

    private flipAfterRotate() {
        const flippedH = this.transform.flipH;
        const flippedV = this.transform.flipV;
        this.transform = {
            ...this.transform,
            flipH: flippedV,
            flipV: flippedH
        };
    }

    resetImage() {
        this.scale = 1;
        this.rotation = 0;
        this.canvasRotation = 0;
        this.transform = {};
    }

    zoomOut() {
        this.scale -= .1;
        this.transform = {
            ...this.transform,
            scale: this.scale
        };
    }

    zoomIn() {
        this.scale += .1;
        this.transform = {
            ...this.transform,
            scale: this.scale
        };
    }

    close(rsn?: any): void {
        this.activeModal.close(rsn);
    }

    save(): void {  
        this.close({image: this.outputFile, markDefault: this.markDefault});
    }

    cancel(): void {
        this.close();
    }

}
