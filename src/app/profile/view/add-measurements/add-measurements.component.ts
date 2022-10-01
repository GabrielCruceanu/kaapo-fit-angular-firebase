import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import { getLoading } from '@/app/store/shared/shared.selector';
import { Observable, Subscription, take } from 'rxjs';
import {
  setErrorMessage,
  setLoadingSpinner,
} from '@/app/store/shared/shared.actions';
import { UploadImageService } from '@/app/shared/services/upload-image/upload-image.service';
import { getClientProfile } from '@/app/profile/store/profile.selector';
import {
  ClientPhysicalDetails,
  ClientProfile,
} from '@/app/profile/model/clientProfile.model';
import { TypeOfUploadImage } from '@/app/shared/model/upload-image-interface';
import {
  CollectionsType,
  UserImageType,
} from '@/app/profile/model/profile-interface';
import { setClientCurrentPhysicalDetailsStart } from '@/app/profile/store/profile.actions';

@Component({
  selector: 'add-measurements',
  templateUrl: './add-measurements.component.html',
  styleUrls: ['./add-measurements.component.scss'],
})
export class AddMeasurementsComponent implements OnInit, OnDestroy {
  getLoadingSpinnerSub: Subscription;
  errorMessage$: Observable<any>;
  clientProfile: ClientProfile;
  clientProfileSub: Subscription;
  addMeasurementsFormGroup: FormGroup;

  constructor(
    private store: Store<AppState>,
    private uploadImageService: UploadImageService
  ) {
    this.store.dispatch(setErrorMessage({ message: '' }));
  }

  ngOnInit(): void {
    this.clientProfileSub = this.store
      .select(getClientProfile)
      .subscribe((clientProfile) => {
        this.clientProfile = clientProfile;
        console.log('AddMeasurementsComponent => clientProfile', clientProfile);
      });

    this.addMeasurementsFormGroup = new FormGroup({
      weight: new FormControl(
        this.clientProfile?.currentPhysicalDetails?.weight
          ? this.clientProfile?.currentPhysicalDetails?.weight
          : '',
        [Validators.required, Validators.pattern('^[0-9]*$')]
      ),
      neck: new FormControl(
        this.clientProfile?.currentPhysicalDetails?.neck
          ? this.clientProfile?.currentPhysicalDetails?.neck
          : '',
        [Validators.required, Validators.pattern('^[0-9]*$')]
      ),
      shoulders: new FormControl(
        this.clientProfile?.currentPhysicalDetails?.shoulders
          ? this.clientProfile?.currentPhysicalDetails?.shoulders
          : '',
        [Validators.required, Validators.pattern('^[0-9]*$')]
      ),
      chest: new FormControl(
        this.clientProfile?.currentPhysicalDetails?.chest
          ? this.clientProfile?.currentPhysicalDetails?.chest
          : '',
        [Validators.required, Validators.pattern('^[0-9]*$')]
      ),
      armLeft: new FormControl(
        this.clientProfile?.currentPhysicalDetails?.armLeft
          ? this.clientProfile?.currentPhysicalDetails?.armLeft
          : '',
        [Validators.required, Validators.pattern('^[0-9]*$')]
      ),
      armRight: new FormControl(
        this.clientProfile?.currentPhysicalDetails?.armRight
          ? this.clientProfile?.currentPhysicalDetails?.armRight
          : '',
        [Validators.required, Validators.pattern('^[0-9]*$')]
      ),
      waist: new FormControl(
        this.clientProfile?.currentPhysicalDetails?.waist
          ? this.clientProfile?.currentPhysicalDetails?.waist
          : '',
        [Validators.required, Validators.pattern('^[0-9]*$')]
      ),
      hip: new FormControl(
        this.clientProfile?.currentPhysicalDetails?.hip
          ? this.clientProfile?.currentPhysicalDetails?.hip
          : '',
        [Validators.required, Validators.pattern('^[0-9]*$')]
      ),
      ass: new FormControl(
        this.clientProfile?.currentPhysicalDetails?.ass
          ? this.clientProfile?.currentPhysicalDetails?.ass
          : '',
        [Validators.required, Validators.pattern('^[0-9]*$')]
      ),
      thigh: new FormControl(
        this.clientProfile?.currentPhysicalDetails?.thigh
          ? this.clientProfile?.currentPhysicalDetails?.thigh
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
      400,
      400,
      this.clientProfile.id,
      UserImageType.clientGalleryFront,
      TypeOfUploadImage.ClientGallery,
      CollectionsType.clients
    );
  }

  onUploadSidePicture() {
    this.uploadImageService.compressImageBeforeUpload(
      100,
      75,
      400,
      400,
      this.clientProfile.id,
      UserImageType.clientGallerySide,
      TypeOfUploadImage.ClientGallery,
      CollectionsType.clients
    );
  }

  onUploadBackPicture() {
    this.uploadImageService.compressImageBeforeUpload(
      100,
      75,
      400,
      400,
      this.clientProfile.id,
      UserImageType.clientGalleryBack,
      TypeOfUploadImage.ClientGallery,
      CollectionsType.clients
    );
  }

  onAddMeasurements(event: Event) {
    event.preventDefault();

    const day = new Date().getUTCDate();
    const month = new Date().getUTCMonth() + 1;
    const year = new Date().getUTCFullYear();
    const {
      weight,
      neck,
      shoulders,
      chest,
      armLeft,
      armRight,
      waist,
      hip,
      ass,
      thigh,
    } = this.addMeasurementsFormGroup.value;

    if (
      this.addMeasurementsFormGroup.valid &&
      this.clientProfile.currentPhysicalDetails.clientGalleryFront &&
      this.clientProfile.currentPhysicalDetails.clientGallerySide &&
      this.clientProfile.currentPhysicalDetails.clientGalleryBack
    ) {
      const currentPhysicalDetails = new ClientPhysicalDetails(
        this.clientProfile.id,
        `${this.clientProfile.id}-${day}-${month}-${year}`,
        {
          date: day,
          month: month,
          year: year,
        },
        weight,
        neck,
        shoulders,
        chest,
        armLeft,
        armRight,
        waist,
        hip,
        ass,
        thigh,
        this.clientProfile.currentPhysicalDetails.clientGalleryFront,
        this.clientProfile.currentPhysicalDetails.clientGallerySide,
        this.clientProfile.currentPhysicalDetails.clientGalleryBack
      );

      this.store.dispatch(setLoadingSpinner({ status: true }));

      this.store.dispatch(
        setClientCurrentPhysicalDetailsStart({
          clientId: this.clientProfile.id,
          currentPhysicalDetails: currentPhysicalDetails,
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
