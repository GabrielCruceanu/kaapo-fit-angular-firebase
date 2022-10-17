import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';

import SwiperCore, { EffectFade } from 'swiper';
import { UserType } from '../../model/profile-interface';
import { UserProfile } from '../../model/userProfile.model';
import { combineLatest, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import { Router } from '@angular/router';
import {
  getClientProfile,
  getGymProfile,
  getNutritionistProfile,
  getTrainerProfile,
  getUserProfile,
} from '../../store/profile.selector';
import { ProfileService } from '../../services/profile.service';
import { ClientProfile } from '../../model/clientProfile.model';
import { GymProfile } from '../../model/gym.model';
import { TrainerProfile } from '../../model/trainerProfile.model';
import { NutritionistProfile } from '../../model/nutritionistProfile.model';

SwiperCore.use([EffectFade]);

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent implements OnInit, OnDestroy {
  userProfile: UserProfile | null;
  userProfileSub: Subscription;
  profileDetails:
    | ClientProfile
    | GymProfile
    | TrainerProfile
    | NutritionistProfile
    | undefined
    | null;
  clientProfileDetails: ClientProfile | undefined | null;

  profileDetailsSub: Subscription;
  userType = UserType;

  constructor(
    private store: Store<AppState>,
    private profileService: ProfileService,
    private router: Router
  ) {}

  ngOnInit() {
    this.userProfileSub = this.store
      .select(getUserProfile)
      .subscribe((userProfile) => {
        if (
          userProfile &&
          !this.profileService.checkIfUserHasProfile(userProfile)
        ) {
          this.router.navigate(['/profil/selectare-profil']);
        }
        this.userProfile = userProfile;
      });

    this.profileDetailsSub = combineLatest([
      this.store.select(getClientProfile),
      this.store.select(getGymProfile),
      this.store.select(getTrainerProfile),
      this.store.select(getNutritionistProfile),
    ]).subscribe(
      ([clientProfile, gymProfile, trainerProfile, nutritionistProfile]) => {
        if (this.userProfile?.userType === UserType.Client) {
          this.clientProfileDetails = clientProfile;
        } else if (this.userProfile?.userType === UserType.Gym) {
          this.profileDetails = gymProfile;
        } else if (this.userProfile?.userType === UserType.Trainer) {
          this.profileDetails = trainerProfile;
        } else if (this.userProfile?.userType === UserType.Nutritionist) {
          this.profileDetails = nutritionistProfile;
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.userProfileSub) {
      this.userProfileSub.unsubscribe();
    } else if (this.profileDetailsSub) {
      this.profileDetailsSub.unsubscribe();
    }
  }
}
