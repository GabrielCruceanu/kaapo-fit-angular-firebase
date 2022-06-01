import { Component, Inject } from '@angular/core';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  TypeOfUploadImage,
  UploadImageData,
} from '../../model/upload-image-interface';
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
    private uploadImageService: UploadImageService
  ) {}

  onProfileStartUpload() {
    this.uploadImageService.compressImageBeforeUpload(
      100,
      75,
      1000,
      1000,
      this.uploadImageData.id,
      this.uploadImageData.imageName,
      this.uploadImageData.typeOfUploadImage,
      this.uploadImageData.folder
    );
  }

  onCoverStartUpload() {
    this.uploadImageService.compressImageBeforeUpload(
      100,
      75,
      1600,
      1600,
      this.uploadImageData.id,
      this.uploadImageData.imageName,
      this.uploadImageData.typeOfUploadImage,
      this.uploadImageData.folder
    );
  }
}
