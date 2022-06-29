import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserType } from '@/app/profile/model/profile-interface';
import { UserProfile } from '@/app/profile/model/userProfile.model';
import { Subscription } from 'rxjs';
import { getUserProfile } from '@/app/profile/store/profile.selector';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'profile-details',
  templateUrl: './profile-details.component.html',
  styleUrls: ['./profile-details.component.scss'],
})
export class ProfileDetailsComponent implements OnInit, OnDestroy {
  userType = UserType;
  userProfile: UserProfile | null;
  userProfileSub: Subscription;
  id: string | number;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.userProfileSub = this.store
      .select(getUserProfile)
      .subscribe((userProfile) => {
        this.userProfile = userProfile;
      });

    this.id = this.route.snapshot.paramMap.get('id')!;
  }

  ngOnDestroy() {
    if (this.userProfileSub) {
      this.userProfileSub.unsubscribe();
    }
  }
}
