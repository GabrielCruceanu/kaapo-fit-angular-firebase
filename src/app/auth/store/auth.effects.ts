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
import { catchError, exhaustMap, map, mergeMap, of, tap } from 'rxjs';
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
  getUserProfileStart,
  getUserProfileSuccess,
} from '../../profile/store/profile.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(loginStart),
      exhaustMap((action) => {
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
        const userProfile = this.authService.formatUserProfileForDb(
          action.userAuth,
          false,
          new Date().getUTCDate(),
          new Date().getUTCMonth() + 1,
          new Date().getUTCFullYear()
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
          map((data) => {
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
      mergeMap((action) => {
        const userAuth = this.authService.getUserAuthFromLocalStorage();
        const userProfile =
          this.profileService.getUserProfileFromLocalStorage();

        if (userAuth && !userProfile) {
          this.store.dispatch(
            getUserProfileStart({ userProfileId: userAuth.id })
          );

          return of(loginSuccess({ userAuth: userAuth, redirect: false }));
        } else if (userAuth && userProfile) {
          this.store.dispatch(
            getUserProfileStart({ userProfileId: userProfile.id })
          );

          this.store.dispatch(
            getUserProfileSuccess({ userProfile: userProfile, redirect: true })
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
        map((action) => {
          this.router.navigate(['/']).then((r) => this.authService.onLogout());
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
            this.router.navigate(['/home']);
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
