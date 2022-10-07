import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { UserType } from '../../model/profile-interface';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import { getUserProfile } from '../../store/profile.selector';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { UserProfile } from '@/app/profile/model/userProfile.model';
import { SettingsDialogComponent } from '@/app/shared/components/settings-dialog/settings-dialog.component';

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
  state: string;
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

  openSettingDialog() {
    this.dialog.open(SettingsDialogComponent);
  }

  ngOnDestroy() {
    if (this.userProfileSub) {
      this.userProfileSub.unsubscribe();
    }
  }
}
