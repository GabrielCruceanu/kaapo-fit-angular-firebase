import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { ProfileService } from '../services/profile.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import {
  createUserProfileStart,
  createUserProfileSuccess,
  getUserProfileStart,
  getUserProfileSuccess,
  updateUserProfileStart,
  updateUserProfileSuccess,
} from './profile.actions';
import { exhaustMap, map, tap } from 'rxjs';
import {
  setErrorMessage,
  setLoadingSpinner,
} from '../../store/shared/shared.actions';
import { AuthService } from '../../auth/services/auth.service';
import { UserProfile } from '../model/userProfile.model';

@Injectable()
export class ProfileEffects {
  createUserProfileStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createUserProfileStart),
      map((action) => {
        this.store.dispatch(setLoadingSpinner({ status: false }));
        this.profileService.setUserProfileInDb(action.userProfile);

        return createUserProfileSuccess({
          userProfile: action.userProfile,
          redirect: true,
        });
      })
    );
  });

  updateUserProfileStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUserProfileStart),
      map((action) => {
        this.profileService.updateUserProfileInDb(action.userProfile);
        this.store.dispatch(setLoadingSpinner({ status: false }));

        return updateUserProfileSuccess({
          userProfile: action.userProfile,
          redirect: true,
        });
      })
    );
  });

  getUserProfileStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getUserProfileStart),
      exhaustMap((action) => {
        return this.profileService
          .getUserProfileFromDb(action.userProfileId)
          .pipe(
            map((data) => {
              const userProfile = data as UserProfile;

              this.store.dispatch(setLoadingSpinner({ status: false }));
              return getUserProfileSuccess({
                userProfile: userProfile,
                redirect: true,
              });
            })
          );
      })
    );
  });

  profileRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          ...[
            createUserProfileSuccess,
            updateUserProfileSuccess,
            getUserProfileSuccess,
          ]
        ),
        tap((action) => {
          this.store.dispatch(setErrorMessage({ message: '' }));
          if (action.redirect) {
            this.router.navigate(['/profile']);
          }
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private profileService: ProfileService,
    private authService: AuthService,
    private router: Router
  ) {}
}
