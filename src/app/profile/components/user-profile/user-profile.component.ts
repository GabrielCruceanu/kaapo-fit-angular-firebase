import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import {
  CollectionsType,
  UserImageType,
  UserType,
} from '../../model/profile-interface';
import { ClientProfile } from '../../model/clientProfile.model';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import { getClientProfile, getUserProfile } from '../../store/profile.selector';
import { Observable, Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UploadImageComponent } from '@/app/shared/components/upload-image/upload-image.component';
import { UserProfile } from '@/app/profile/model/userProfile.model';
import { TypeOfUploadImage } from '@/app/shared/model/upload-image-interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit, OnDestroy {
  @Input()
  firstName: string | null;
  @Input()
  lastName: string | null;
  @Input()
  name: string | null;
  @Input()
  country: string;
  @Input()
  city: string;
  @Input()
  status: string;

  userProfileSub: Subscription;
  userProfile: UserProfile | null;
  userType = UserType;

  sampleUserProfileImage = '../../../../assets/images/user.jpg';
  sampleUserCoverImage = '../../../../assets/images/cover.jpg';

  constructor(private store: Store<AppState>, public dialog: MatDialog) {}

  ngOnInit(): void {
    this.userProfileSub = this.store
      .select(getUserProfile)
      .subscribe((userProfile) => (this.userProfile = userProfile));
  }

  changeProfilePicture() {
    this.dialog.open(UploadImageComponent, {
      data: {
        id: this.userProfile.id,
        typeOfUploadImage: TypeOfUploadImage.Profile,
        imageName: UserImageType.profile,
        folder: CollectionsType.users,
      },
    });
  }

  changeCoverPicture() {
    this.dialog.open(UploadImageComponent, {
      data: {
        id: this.userProfile.id,
        typeOfUploadImage: TypeOfUploadImage.Cover,
        imageName: UserImageType.cover,
        folder: CollectionsType.users,
      },
    });
  }

  ngOnDestroy() {
    if (this.userProfileSub) {
      this.userProfileSub.unsubscribe();
    }
  }
}
