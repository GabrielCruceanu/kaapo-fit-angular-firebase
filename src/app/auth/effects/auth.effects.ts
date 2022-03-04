import { Injectable } from '@angular/core';
import { Actions, createEffect, Effect, ofType } from '@ngrx/effects';
import { AuthActions, LoginPageActions } from '../actions';
import { AuthService } from '../services';
import { Router } from '@angular/router';
import { catchError, exhaustMap, from, map, of, switchMap, tap } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { LogoutConfirmationDialogComponent } from '../components/logout-confirmation-dialog/logout-confirmation-dialog.component';
import { Auth } from '@angular/fire/auth';
import { loginRedirect } from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(LoginPageActions.login.type),
      switchMap((auth) =>
        from(this.authService.login(auth.credentials)).pipe(
          map((userCredential) => {
            console.log('userCredential', userCredential);
            return AuthActions.loginSuccess({ user: userCredential.user });
          }),
          catchError((error) => of(AuthActions.loginFailure({ error })))
        )
      )
    )
  );

  loginSuccess$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginSuccess.type),
        tap((e) => {
          console.log('e', e);
          return this.router.navigate(['/home']);
        })
      ),
    { dispatch: false }
  );

  logOut$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.logout.type),
        tap((logout) => {
          console.log('logout', logout);
          this.authService.logOut();
        })
      ),
    { dispatch: false }
  );

  @Effect()
  logoutConfirmation$ = this.actions$.pipe(
    ofType(AuthActions.logoutConfirmation.type),
    exhaustMap(() => {
      const dialogRef = this.dialog.open<
        LogoutConfirmationDialogComponent,
        undefined,
        boolean
      >(LogoutConfirmationDialogComponent);

      return dialogRef.afterClosed();
    }),
    map((result) =>
      result ? AuthActions.logout() : AuthActions.logoutConfirmationDismiss()
    )
  );

  loginRedirect = createEffect(
    () =>
      this.actions$.pipe(
        ofType(AuthActions.loginRedirect.type),
        tap((loginRedirect) => {
          console.log('loginRedirect', loginRedirect);
          this.router.navigate(['/auth/login']);
        })
      ),
    {
      dispatch: false,
    }
  );

  constructor(
    private actions$: Actions<LoginPageActions.LoginPageActionsUnion>,
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) {}
}
