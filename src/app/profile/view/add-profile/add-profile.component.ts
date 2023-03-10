import { Component, OnDestroy, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import {
  CLIENT_ICON,
  NUTRITION_ICON,
  TRAINER_ICON,
  WORKOUT_ICON,
} from '@/content/icons';
import { getProfilesData } from '@/app/profile/data/profileData';
import { ProfileData } from '../../model/profileData.model';
import { getUserProfile } from '@/app/profile/store/profile.selector';
import { UserType } from '@/app/profile/model/profile-interface';
import { UserProfile } from '@/app/profile/model/userProfile.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import { ProfileService } from '@/app/profile/services/profile.service';
import { CountryService } from '@/app/shared/services/country.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-profile',
  templateUrl: './add-profile.component.html',
  styleUrls: ['./add-profile.component.scss'],
})
export class AddProfileComponent implements OnInit, OnDestroy {
  profiles: ProfileData[];
  userProfile: UserProfile | null | undefined;
  userProfileSub: Subscription | undefined;

  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private store: Store<AppState>,
    private router: Router
  ) {
    this.matIconRegistry.addSvgIconLiteral(
      'client',
      this.domSanitizer.bypassSecurityTrustHtml(CLIENT_ICON)
    );
    this.matIconRegistry.addSvgIconLiteral(
      'nutrition',
      this.domSanitizer.bypassSecurityTrustHtml(NUTRITION_ICON)
    );
    this.matIconRegistry.addSvgIconLiteral(
      'trainer',
      this.domSanitizer.bypassSecurityTrustHtml(TRAINER_ICON)
    );
    this.matIconRegistry.addSvgIconLiteral(
      'workout',
      this.domSanitizer.bypassSecurityTrustHtml(WORKOUT_ICON)
    );

    this.profiles = getProfilesData();
  }

  ngOnInit() {
    this.userProfileSub = this.store
      .select(getUserProfile)
      .subscribe((userProfile) => {
        this.userProfile = userProfile;
        if (userProfile.hasProfile) {
          this.router.navigate(['/profil']);
        }
      });
  }

  ngOnDestroy() {
    if (this.userProfileSub) {
      this.userProfileSub.unsubscribe();
    }
  }
}
