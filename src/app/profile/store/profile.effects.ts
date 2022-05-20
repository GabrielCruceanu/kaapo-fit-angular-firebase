import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { ProfileService } from '../services/profile.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import {
  createClientProfileStart,
  createClientProfileSuccess,
  createGymProfileStart,
  createGymProfileSuccess,
  createNutritionistProfileStart,
  createNutritionistProfileSuccess,
  createTrainerProfileStart,
  createTrainerProfileSuccess,
  createUserProfileStart,
  createUserProfileSuccess,
  getClientProfileStart,
  getClientProfileSuccess,
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
import { ClientProfile } from '../model/clientProfile.model';

@Injectable()
export class ProfileEffects {
  createUserProfileStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createUserProfileStart),
      map((action) => {
        this.profileService.setUserProfileInLocalStorage(action.userProfile);
        this.profileService.createUserProfileInDb(action.userProfile);

        this.store.dispatch(setLoadingSpinner({ status: false }));

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
        this.profileService.setUserProfileInLocalStorage(action.userProfile);
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

              this.profileService.setUserProfileInLocalStorage(userProfile);
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

  getClientProfileStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getClientProfileStart),
      exhaustMap((action) => {
        return this.profileService
          .getUserProfileFromDb(action.clientProfileId)
          .pipe(
            map((data) => {
              const clientProfile = data as ClientProfile;

              this.profileService.setClientProfileInLocalStorage(clientProfile);
              this.store.dispatch(setLoadingSpinner({ status: false }));
              return getClientProfileSuccess({
                clientProfile: clientProfile,
                redirect: true,
              });
            })
          );
      })
    );
  });

  createClientProfileStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createClientProfileStart),
      map((action) => {
        this.profileService.createClientProfileInDb(action.clientProfile);

        this.store.dispatch(setLoadingSpinner({ status: false }));

        return createClientProfileSuccess({
          clientProfile: action.clientProfile,
          redirect: true,
        });
      })
    );
  });

  createGymProfileStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createGymProfileStart),
      map((action) => {
        this.profileService.createGymProfileInDb(action.gymProfile);

        this.store.dispatch(setLoadingSpinner({ status: false }));

        return createGymProfileSuccess({
          gymProfile: action.gymProfile,
          redirect: true,
        });
      })
    );
  });

  createTrainerProfileStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createTrainerProfileStart),
      map((action) => {
        this.profileService.createTrainerProfileInDb(action.trainerProfile);

        this.store.dispatch(setLoadingSpinner({ status: false }));

        return createTrainerProfileSuccess({
          trainerProfile: action.trainerProfile,
          redirect: true,
        });
      })
    );
  });

  createNutritionistProfileStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createNutritionistProfileStart),
      map((action) => {
        this.profileService.createNutritionistProfileInDb(
          action.nutritionistProfile
        );

        this.store.dispatch(setLoadingSpinner({ status: false }));

        return createNutritionistProfileSuccess({
          nutritionistProfile: action.nutritionistProfile,
          redirect: true,
        });
      })
    );
  });

  profileRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          ...[
            createClientProfileSuccess,
            createGymProfileSuccess,
            createTrainerProfileSuccess,
            createNutritionistProfileSuccess,
          ]
        ),
        tap((action) => {
          this.store.dispatch(setErrorMessage({ message: '' }));
          if (action.redirect) {
            this.router.navigateByUrl('/home');
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
