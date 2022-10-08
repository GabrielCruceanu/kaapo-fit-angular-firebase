import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import { getLoading } from '@/app/store/shared/shared.selector';
import { Observable, Subscription } from 'rxjs';
import {
  setErrorMessage,
  setLoadingSpinner,
} from '@/app/store/shared/shared.actions';
import { UploadImageService } from '@/app/shared/services/upload-image/upload-image.service';
import {
  getClientProfile,
  getCurrentPhysicalDetails,
  getNutritionistProfile,
  getTrainerProfile,
  getUserProfile,
} from '@/app/profile/store/profile.selector';
import {
  ClientPhysicalDetails,
  ClientProfile,
} from '@/app/profile/model/clientProfile.model';
import { TypeOfUploadImage } from '@/app/shared/model/upload-image-interface';
import {
  CollectionsType,
  UserImageType,
  UserType,
} from '@/app/profile/model/profile-interface';
import {
  setCurrentPhysicalDetailsStart,
  setClientHistoryPhysicalDetailsStart,
} from '@/app/profile/store/profile.actions';
import { TrainerProfile } from '@/app/profile/model/trainerProfile.model';
import { NutritionistProfile } from '@/app/profile/model/nutritionistProfile.model';
import { UserProfile } from '@/app/profile/model/userProfile.model';

@Component({
  selector: 'add-measurements',
  templateUrl: './add-measurements.component.html',
  styleUrls: ['./add-measurements.component.scss'],
})
export class AddMeasurementsComponent implements OnInit, OnDestroy {
  getLoadingSpinnerSub: Subscription;
  errorMessage$: Observable<any>;
  currentUserProfile: ClientProfile | TrainerProfile | NutritionistProfile;
  userProfile: UserProfile;
  userProfileSub: Subscription;
  clientProfile: ClientProfile;
  clientProfileSub: Subscription;
  trainerProfile: TrainerProfile;
  trainerProfileSub: Subscription;
  nutritionistProfile: NutritionistProfile;
  nutritionistProfileSub: Subscription;
  addMeasurementsFormGroup: FormGroup;
  currentPhysicalDetails$: Observable<ClientPhysicalDetails>;

  constructor(
    private store: Store<AppState>,
    private uploadImageService: UploadImageService
  ) {
    this.store.dispatch(setErrorMessage({ message: '' }));
  }

  ngOnInit(): void {
    this.userProfileSub = this.store
      .select(getUserProfile)
      .subscribe((userProfile) => {
        this.userProfile = userProfile;
        console.log('AddMeasurementsComponent => userProfile', userProfile);
        switch (userProfile.userType) {
          case UserType.Client:
            this.clientProfileSub = this.store
              .select(getClientProfile)
              .subscribe((clientProfile) => {
                this.currentUserProfile = clientProfile;
                console.log(
                  'AddMeasurementsComponent => clientProfile',
                  clientProfile
                );
              });
            break;

          case UserType.Trainer:
            this.trainerProfileSub = this.store
              .select(getTrainerProfile)
              .subscribe((trainerProfile) => {
                this.currentUserProfile = trainerProfile;
                console.log(
                  'AddMeasurementsComponent => trainerProfile',
                  trainerProfile
                );
              });
            break;

          case UserType.Trainer:
            this.nutritionistProfileSub = this.store
              .select(getNutritionistProfile)
              .subscribe((nutritionistProfile) => {
                this.currentUserProfile = nutritionistProfile;
                console.log(
                  'AddMeasurementsComponent => nutritionistProfile',
                  nutritionistProfile
                );
              });
            break;
        }
      });
    this.currentPhysicalDetails$ = this.store.select(getCurrentPhysicalDetails);
    this.addMeasurementsFormGroup = new FormGroup({
      weight: new FormControl(
        this.currentUserProfile?.currentPhysicalDetails?.weight
          ? this.currentUserProfile?.currentPhysicalDetails?.weight
          : '',
        [Validators.required, Validators.pattern('^[0-9]*$')]
      ),
      head: new FormControl(
        this.currentUserProfile?.currentPhysicalDetails?.head
          ? this.currentUserProfile?.currentPhysicalDetails?.head
          : '',
        [Validators.required, Validators.pattern('^[0-9]*$')]
      ),
      shoulders: new FormControl(
        this.currentUserProfile?.currentPhysicalDetails?.shoulders
          ? this.currentUserProfile?.currentPhysicalDetails?.shoulders
          : '',
        [Validators.required, Validators.pattern('^[0-9]*$')]
      ),
      chest: new FormControl(
        this.currentUserProfile?.currentPhysicalDetails?.chest
          ? this.currentUserProfile?.currentPhysicalDetails?.chest
          : '',
        [Validators.required, Validators.pattern('^[0-9]*$')]
      ),
      armLeft: new FormControl(
        this.currentUserProfile?.currentPhysicalDetails?.armLeft
          ? this.currentUserProfile?.currentPhysicalDetails?.armLeft
          : '',
        [Validators.required, Validators.pattern('^[0-9]*$')]
      ),
      armRight: new FormControl(
        this.currentUserProfile?.currentPhysicalDetails?.armRight
          ? this.currentUserProfile?.currentPhysicalDetails?.armRight
          : '',
        [Validators.required, Validators.pattern('^[0-9]*$')]
      ),
      waist: new FormControl(
        this.currentUserProfile?.currentPhysicalDetails?.waist
          ? this.currentUserProfile?.currentPhysicalDetails?.waist
          : '',
        [Validators.required, Validators.pattern('^[0-9]*$')]
      ),
      highHip: new FormControl(
        this.currentUserProfile?.currentPhysicalDetails?.highHip
          ? this.currentUserProfile?.currentPhysicalDetails?.highHip
          : '',
        [Validators.required, Validators.pattern('^[0-9]*$')]
      ),
      hip: new FormControl(
        this.currentUserProfile?.currentPhysicalDetails?.hip
          ? this.currentUserProfile?.currentPhysicalDetails?.hip
          : '',
        [Validators.required, Validators.pattern('^[0-9]*$')]
      ),
      waistToKnee: new FormControl(
        this.currentUserProfile?.currentPhysicalDetails?.waistToKnee
          ? this.currentUserProfile?.currentPhysicalDetails?.waistToKnee
          : '',
        [Validators.required, Validators.pattern('^[0-9]*$')]
      ),
      knee: new FormControl(
        this.currentUserProfile?.currentPhysicalDetails?.knee
          ? this.currentUserProfile?.currentPhysicalDetails?.knee
          : '',
        [Validators.required, Validators.pattern('^[0-9]*$')]
      ),
      ankle: new FormControl(
        this.currentUserProfile?.currentPhysicalDetails?.ankle
          ? this.currentUserProfile?.currentPhysicalDetails?.ankle
          : '',
        [Validators.required, Validators.pattern('^[0-9]*$')]
      ),
    });

    this.getLoadingSpinnerSub = this.store
      .select(getLoading)
      .subscribe((isLoading: boolean) => {
        if (isLoading) {
          this.addMeasurementsFormGroup.disable();
        } else {
          this.addMeasurementsFormGroup.enable();
        }
      });
  }

  onUploadFrontPicture() {
    this.uploadImageService.compressImageBeforeUpload(
      100,
      75,
      1000,
      500,
      this.currentUserProfile.id,
      UserImageType.clientGalleryFront,
      TypeOfUploadImage.ClientGallery,
      this.userProfile.userType === UserType.Client
        ? CollectionsType.clients
        : this.userProfile.userType === UserType.Trainer
        ? CollectionsType.trainers
        : CollectionsType.nutritionists,
      this.currentUserProfile
    );
  }

  onUploadSidePicture() {
    this.uploadImageService.compressImageBeforeUpload(
      100,
      75,
      1000,
      400,
      this.currentUserProfile.id,
      UserImageType.clientGallerySide,
      TypeOfUploadImage.ClientGallery,
      this.userProfile.userType === UserType.Client
        ? CollectionsType.clients
        : this.userProfile.userType === UserType.Trainer
        ? CollectionsType.trainers
        : CollectionsType.nutritionists,
      this.currentUserProfile
    );
  }

  onUploadBackPicture() {
    this.uploadImageService.compressImageBeforeUpload(
      100,
      75,
      1000,
      400,
      this.currentUserProfile.id,
      UserImageType.clientGalleryBack,
      TypeOfUploadImage.ClientGallery,
      this.userProfile.userType === UserType.Client
        ? CollectionsType.clients
        : this.userProfile.userType === UserType.Trainer
        ? CollectionsType.trainers
        : CollectionsType.nutritionists,
      this.currentUserProfile
    );
  }

  onAddMeasurements(event: Event) {
    event.preventDefault();

    const day = new Date().getUTCDate();
    const month = new Date().getUTCMonth() + 1;
    const year = new Date().getUTCFullYear();
    const {
      weight,
      head,
      shoulders,
      chest,
      armLeft,
      armRight,
      waist,
      hip,
      highHip,
      waistToKnee,
      knee,
      ankle,
    } = this.addMeasurementsFormGroup.value;

    if (
      this.addMeasurementsFormGroup.valid &&
      this.currentUserProfile.currentPhysicalDetails.clientGalleryFront &&
      this.currentUserProfile.currentPhysicalDetails.clientGallerySide &&
      this.currentUserProfile.currentPhysicalDetails.clientGalleryBack
    ) {
      const currentPhysicalDetails = new ClientPhysicalDetails(
        this.currentUserProfile.id,
        `${this.currentUserProfile.id}-${day}-${month}-${year}`,
        {
          date: day,
          month: month,
          year: year,
        },
        weight,
        head,
        shoulders,
        chest,
        armLeft,
        armRight,
        waist,
        hip,
        highHip,
        waistToKnee,
        knee,
        ankle,
        this.currentUserProfile.currentPhysicalDetails.clientGalleryFront,
        this.currentUserProfile.currentPhysicalDetails.clientGallerySide,
        this.currentUserProfile.currentPhysicalDetails.clientGalleryBack
      );

      this.store.dispatch(setLoadingSpinner({ status: true }));

      this.store.dispatch(
        setCurrentPhysicalDetailsStart({
          clientId: this.currentUserProfile.id,
          currentPhysicalDetails: currentPhysicalDetails,
          folder:
            this.userProfile.userType === UserType.Client
              ? CollectionsType.clients
              : this.userProfile.userType === UserType.Trainer
              ? CollectionsType.trainers
              : CollectionsType.nutritionists,
        })
      );

      this.store.dispatch(
        setClientHistoryPhysicalDetailsStart({
          clientId: this.clientProfile.id,
          clientPhysicalDetails: currentPhysicalDetails,
        })
      );
    }
  }

  ngOnDestroy() {
    if (this.clientProfileSub) {
      this.clientProfileSub.unsubscribe();
    }
  }
}
