import { Component, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  TypeOfUploadImage,
  UploadImageData,
} from '../../model/upload-image-interface';
import { DataUrl, NgxImageCompressService } from 'ngx-image-compress';
import { UploadImageService } from '@/app/shared/services/upload-image/upload-image.service';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent {
  percentageSub: Subscription;
  typeOfUploadImage = TypeOfUploadImage;

  constructor(
    @Inject(MAT_DIALOG_DATA) public uploadImageData: UploadImageData,
    private imageCompress: NgxImageCompressService,
    private uploadImageService: UploadImageService
  ) {}

  onProfileStartUpload() {
    this.compressImageBeforeUpload(100, 75, 1000, 1000);
  }

  onCoverStartUpload() {
    this.compressImageBeforeUpload(100, 75, 1600, 1600);
  }

  compressImageBeforeUpload(ratio, quality, maxWidth, maxHeight) {
    return this.imageCompress.uploadFile().then(({ image, orientation }) => {
      this.imageCompress
        .compressFile(image, orientation, ratio, quality, maxWidth, maxHeight)
        .then((result: DataUrl) => {
          // this.store.dispatch(setLoadingSpinner({ status: true }));
          const split = result.split(',');
          const type = split[0].replace('data:', '').replace(';base64', '');
          const byteString = atob(split[1]);
          const arrayBuffer = new ArrayBuffer(byteString.length);
          const ia = new Uint8Array(arrayBuffer);
          for (let i = 0; i < byteString.length; i += 1) {
            ia[i] = byteString.charCodeAt(i);
          }
          const fileBlob = new Blob([arrayBuffer], { type });

          this.uploadImageService.startUpload(
            fileBlob,
            this.uploadImageData.id,
            this.uploadImageData.imageName,
            this.uploadImageData.typeOfUploadImage,
            this.uploadImageData.folder
          );
        });
    });
  }
}
