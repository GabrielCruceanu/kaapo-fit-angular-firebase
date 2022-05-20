import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { getUserDataMock } from '../../../../data/userDetails';

import SwiperCore, { EffectFade } from 'swiper';
import { ClientDetails } from '../../model/profile-interface';
import { UserProfile } from '../../model/userProfile.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { Router } from '@angular/router';
import { getUserProfile } from '../../store/profile.selector';
import { ProfileService } from '../../services/profile.service';
SwiperCore.use([EffectFade]);

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit, OnDestroy {
  public title: string = 'My Profile';
  public profile: ClientDetails;
  userProfile: UserProfile | null | undefined;
  userProfileSub: Subscription | undefined;

  constructor(
    private store: Store<AppState>,
    private profileService: ProfileService,
    private router: Router
  ) {
    this.profile = getUserDataMock();
  }

  ngOnInit() {
    // this.userProfileSub = this.store
    //   .select(getUserProfile)
    //   .subscribe((userProfile) => {
    //     this.userProfile = userProfile;
    //     if (!userProfile?.hasProfile) {
    //       this.router.navigate(['/profile/add']);
    //       console.log('this.userProfile', this.userProfile);
    //     }
    //   });
    if (!this.profileService.checkIfUserHasProfile()) {
      this.router.navigate(['/profile/add']);
    }
  }

  ngOnDestroy() {
    if (this.userProfileSub) {
      this.userProfileSub.unsubscribe();
    }
  }
}
