import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { autoLogin } from './auth/store/auth.actions';
import { getUserProfile } from './profile/store/profile.selector';
import { combineLatest } from 'rxjs';
import { getUserAuth } from './auth/store/auth.selector';
import { AuthService } from './auth/services/auth.service';
import { ProfileService } from './profile/services/profile.service';
import { UserType } from './profile/model/profile-interface';
import {
  getClientProfileStart,
  getGymProfileStart,
  getNutritionistProfileStart,
  getTrainerProfileStart,
  getUserProfileStart,
} from './profile/store/profile.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private authService: AuthService,
    private profileService: ProfileService
  ) {
    this.store.dispatch(autoLogin());
  }

  public ngOnInit() {
    combineLatest([
      this.store.select(getUserAuth),
      this.store.select(getUserProfile),
    ]).subscribe(([userAuth, userProfile]) => {
      console.log('userAuth', userAuth);
      console.log('userProfile', userProfile);
    });
  }
}
