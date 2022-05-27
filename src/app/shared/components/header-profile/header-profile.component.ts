import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ClientProfile } from '@/app/profile/model/clientProfile.model';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import {
  getClientProfile,
  getUserProfile,
} from '@/app/profile/store/profile.selector';
import { UserProfile } from '@/app/profile/model/userProfile.model';
import { SampleUserProfileImage } from '@/data/profileData';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss'],
})
export class HeaderProfileComponent implements OnInit {
  @Input()
  end: boolean | undefined;
  clientProfileDetails$: Observable<ClientProfile | null>;
  userProfileDetails$: Observable<UserProfile | null>;
  sampleUserProfileImage = SampleUserProfileImage;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.clientProfileDetails$ = this.store.select(getClientProfile);
    this.userProfileDetails$ = this.store.select(getUserProfile);
  }
}
