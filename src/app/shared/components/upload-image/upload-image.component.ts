import { Component, Inject, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import {
  TypeOfUploadImage,
  UploadImageData,
} from '../../model/upload-image-interface';
import { UploadImageService } from '@/app/shared/services/upload-image/upload-image.service';
import { ClientProfile } from '@/app/profile/model/clientProfile.model';
import { TrainerProfile } from '@/app/profile/model/trainerProfile.model';
import { NutritionistProfile } from '@/app/profile/model/nutritionistProfile.model';
import {
  getClientProfile,
  getGymProfile,
  getNutritionistProfile,
  getTrainerProfile,
  getUserProfile,
} from '@/app/profile/store/profile.selector';
import { UserType } from '@/app/profile/model/profile-interface';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import { UserProfile } from '@/app/profile/model/userProfile.model';
import { GymProfile } from '@/app/profile/model/gym.model';

@Component({
  selector: 'app-upload-image',
  templateUrl: './upload-image.component.html',
  styleUrls: ['./upload-image.component.scss'],
})
export class UploadImageComponent implements OnInit {
  percentageSub: Subscription;
  typeOfUploadImage = TypeOfUploadImage;
  userProfile: UserProfile;
  userProfileSub: Subscription;
  currentUserProfile:
    | ClientProfile
    | TrainerProfile
    | NutritionistProfile
    | GymProfile;
  clientProfileSub: Subscription;
  clientProfile: ClientProfile;
  trainerProfile: TrainerProfile;
  trainerProfileSub: Subscription;
  nutritionistProfile: NutritionistProfile;
  nutritionistProfileSub: Subscription;
  gymProfile: GymProfile;
  gymProfileSub: Subscription;

  constructor(
    @Inject(MAT_DIALOG_DATA) public uploadImageData: UploadImageData,
    private uploadImageService: UploadImageService,

    private store: Store<AppState>
  ) {}

  ngOnInit() {
    this.userProfileSub = this.store
      .select(getUserProfile)
      .subscribe((userProfile) => {
        this.userProfile = userProfile;
        switch (userProfile.userType) {
          case UserType.Client:
            this.clientProfileSub = this.store
              .select(getClientProfile)
              .subscribe((clientProfile) => {
                this.currentUserProfile = clientProfile;
              });
            break;

          case UserType.Trainer:
            this.trainerProfileSub = this.store
              .select(getTrainerProfile)
              .subscribe((trainerProfile) => {
                this.currentUserProfile = trainerProfile;
              });
            break;

          case UserType.Nutritionist:
            this.nutritionistProfileSub = this.store
              .select(getNutritionistProfile)
              .subscribe((nutritionistProfile) => {
                this.currentUserProfile = nutritionistProfile;
              });
            break;
          case UserType.Gym:
            this.gymProfileSub = this.store
              .select(getGymProfile)
              .subscribe((gymProfile) => {
                this.currentUserProfile = gymProfile;
              });
            break;
        }
      });
  }

  onProfileStartUpload() {
    this.uploadImageService.compressImageBeforeUpload(
      100,
      75,
      1000,
      1000,
      this.uploadImageData.id,
      this.uploadImageData.imageName,
      this.uploadImageData.typeOfUploadImage,
      this.uploadImageData.folder,
      undefined,
      this.currentUserProfile
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
      this.uploadImageData.folder,
      undefined,
      this.currentUserProfile
    );
  }
}
