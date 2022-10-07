import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  autoLogin,
  autoLogout,
  loginStart,
  loginSuccess,
  resetStart,
  resetSuccess,
  signupStart,
  signupSuccess,
} from './auth.actions';
import {
  catchError,
  exhaustMap,
  map,
  mergeMap,
  of,
  switchMap,
  tap,
} from 'rxjs';
import { AuthService } from '../services/auth.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Router } from '@angular/router';
import {
  setErrorMessage,
  setLoadingSpinner,
} from '../../store/shared/shared.actions';
import { ProfileService } from '../../profile/services/profile.service';
import {
  createUserProfileStart,
  getClientHistoryPhysicalDetails,
  getClientProfileSuccess,
  getGymProfileSuccess,
  getNutritionistProfileSuccess,
  getTrainerProfileSuccess,
  getUserProfileStart,
  getUserProfileSuccess,
} from '../../profile/store/profile.actions';
import { UserType } from '../../profile/model/profile-interface';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      switchMap((action) => {
        return this.authService.onLogin(action.email, action.password).pipe(
          map((data) => {
            this.store.dispatch(setErrorMessage({ message: '' }));
            const userAuth = this.authService.formatUser(data);
            this.authService.setUserAuthInLocalStorage(userAuth);

            this.store.dispatch(
              getUserProfileStart({ userProfileId: userAuth.id })
            );
            this.store.dispatch(setLoadingSpinner({ status: false }));
            return loginSuccess({ userAuth: userAuth, redirect: true });
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.authService.getErrorMessage(
              errResp.error.error.message
            );
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  signUp$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupStart),
      exhaustMap((action) => {
        return this.authService.onSignUp(action.email, action.password).pipe(
          map((data) => {
            // Define the user
            const userAuth = this.authService.formatUser(data);

            //Save user local and in Firestore
            this.authService.setUserAuthInLocalStorage(userAuth);
            return signupSuccess({ userAuth: userAuth, redirect: true });
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.authService.getErrorMessage(
              errResp.error.error.message
            );
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  signupSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(signupSuccess),
      map((action) => {
        const coverImage = {
          downloadURL:
            'https://firebasestorage.googleapis.com/v0/b/kaapo-fit.appspot.com/o/cover.jpg?alt=media&token=8b6f1f36-17ff-49b4-b00e-155353f7b1f2',
          path: '/',
        };
        const profileImage = {
          downloadURL:
            'https://firebasestorage.googleapis.com/v0/b/kaapo-fit.appspot.com/o/user.jpg?alt=media&token=4954929e-51aa-41eb-860e-b7709460428f',
          path: '/',
        };
        const userProfile = this.authService.formatUserProfileForDb(
          action.userAuth,
          false,
          new Date().getUTCDate(),
          new Date().getUTCMonth() + 1,
          new Date().getUTCFullYear(),
          null,
          coverImage,
          profileImage
        );

        return createUserProfileStart({ userProfile: userProfile });
      })
    );
  });

  resetPassword$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(resetStart),
      exhaustMap((action) => {
        return this.authService.onResetPassword(action.email).pipe(
          map(() => {
            return resetSuccess({ redirect: false });
          }),
          catchError((errResp) => {
            this.store.dispatch(setLoadingSpinner({ status: false }));
            const errorMessage = this.authService.getErrorMessage(
              errResp.error.error.message
            );
            return of(setErrorMessage({ message: errorMessage }));
          })
        );
      })
    );
  });

  autoLogin$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(autoLogin),
      mergeMap(() => {
        const userAuth = this.authService.getUserAuthFromLocalStorage();
        const userProfile =
          this.profileService.getUserProfileFromLocalStorage();

        if (userAuth && !userProfile) {
          console.log('userAuth && !userProfile');
          this.store.dispatch(
            getUserProfileStart({ userProfileId: userAuth.id })
          );

          return of(loginSuccess({ userAuth: userAuth, redirect: false }));
        } else if (userAuth && userProfile) {
          this.store.dispatch(
            getUserProfileStart({ userProfileId: userProfile.id })
          );
          switch (userProfile.userType) {
            case UserType.Client: {
              const clientProfile =
                this.profileService.getClientProfileFromLocalStorage();
              if (clientProfile) {
                console.log('autoLogin > clientProfile', clientProfile);
                this.store.dispatch(
                  getClientHistoryPhysicalDetails({
                    clientId: clientProfile.id,
                  })
                );
                this.store.dispatch(
                  getClientProfileSuccess({
                    clientProfile: clientProfile,
                    redirect: false,
                  })
                );
              }
              break;
            }
            case UserType.Gym: {
              const gymProfile =
                this.profileService.getGymProfileFromLocalStorage();
              if (gymProfile) {
                this.store.dispatch(
                  getGymProfileSuccess({
                    gymProfile: gymProfile,
                    redirect: false,
                  })
                );
              }
              break;
            }
            case UserType.Trainer: {
              const trainerProfile =
                this.profileService.getTrainerProfileFromLocalStorage();
              if (trainerProfile) {
                this.store.dispatch(
                  getTrainerProfileSuccess({
                    trainerProfile: trainerProfile,
                    redirect: false,
                  })
                );
              }
              break;
            }
            case UserType.Nutritionist: {
              const nutritionistProfile =
                this.profileService.getNutritionistProfileFromLocalStorage();
              if (nutritionistProfile) {
                this.store.dispatch(
                  getNutritionistProfileSuccess({
                    nutritionistProfile: nutritionistProfile,
                    redirect: false,
                  })
                );
              }
              break;
            }
          }

          this.store.dispatch(
            getUserProfileSuccess({ userProfile: userProfile, redirect: false })
          );

          return of(loginSuccess({ userAuth: userAuth, redirect: false }));
        } else {
          return of(autoLogout());
        }
      })
    );
  });

  logout$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(autoLogout),
        map(() => {
          this.router.navigate(['/']).then(() => this.authService.onLogout());
        })
      );
    },
    { dispatch: false }
  );

  authRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(...[loginSuccess, signupSuccess]),
        tap((action) => {
          this.store.dispatch(setErrorMessage({ message: '' }));
          if (action.redirect) {
            this.router.navigate(['/profil']);
          }
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private profileService: ProfileService,
    private store: Store<AppState>,
    private router: Router
  ) {}
}
