import { Component, OnInit } from '@angular/core';
import { getUserProfile } from '@/app/profile/store/profile.selector';
import { UploadImageComponent } from '@/app/shared/components/upload-image/upload-image.component';
import { TypeOfUploadImage } from '@/app/shared/model/upload-image-interface';
import {
  CollectionsType,
  UserImageType,
  UserType,
} from '@/app/profile/model/profile-interface';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { UserProfile } from '@/app/profile/model/userProfile.model';
import { Router } from '@angular/router';

@Component({
  selector: 'settings-dialog',
  templateUrl: './settings-dialog.component.html',
  styleUrls: ['./settings-dialog.component.scss'],
})
export class SettingsDialogComponent implements OnInit {
  userProfileSub: Subscription;
  userProfile: UserProfile | null;
  userType = UserType;

  constructor(
    private store: Store<AppState>,
    public dialog: MatDialog,
    private router: Router
  ) {}

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
  editProfile(event: Event) {
    event.preventDefault();

    switch (this.userProfile.userType) {
      case UserType.Client:
        this.router
          .navigateByUrl('/profil/client')
          .then(() => this.dialog.closeAll());
        break;
      case UserType.Nutritionist:
        this.router
          .navigateByUrl('/profil/nutritionist')
          .then(() => this.dialog.closeAll());
        break;
      case UserType.Trainer:
        this.router
          .navigateByUrl('/profil/antrenor')
          .then(() => this.dialog.closeAll());
        break;
      case UserType.Gym:
        this.router
          .navigateByUrl('/profil/sala')
          .then(() => this.dialog.closeAll());
        break;
    }
  }
  ngOnDestroy() {
    if (this.userProfileSub) {
      this.userProfileSub.unsubscribe();
    }
  }
}
