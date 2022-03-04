import {createAction, props, union} from "@ngrx/store";
import {Credentials} from "../../model/user";
import {User} from "@angular/fire/auth";

export enum AuthActionsType {
  LOGIN_SUCCESS = '[Auth/API] Login Success',
  LOGIN_FAILURE = '[Auth/API] Login Failure',
  LOGIN_REDIRECT = '[Auth/API] Login Redirect',
  LOGOUT = '[Auth] Logout',
  LOGOUT_CONFIRMATION = '[Auth] Logout Confirmation',
  LOGOUT_CONFIRMATION_DISMISS = '[Auth] Logout Confirmation Dismiss'
}

export const loginSuccess = createAction(AuthActionsType.LOGIN_SUCCESS, props<{user: User}>());
export const loginFailure = createAction(AuthActionsType.LOGIN_FAILURE, props<{error: any}>());

export const loginRedirect = createAction(AuthActionsType.LOGIN_REDIRECT);

export const logout = createAction(AuthActionsType.LOGOUT);
export const logoutConfirmation = createAction(AuthActionsType.LOGOUT_CONFIRMATION);
export const logoutConfirmationDismiss = createAction(AuthActionsType.LOGOUT_CONFIRMATION_DISMISS);

const all = union({
  loginSuccess,
  loginFailure,
  loginRedirect,
  logout,
  logoutConfirmation,
  logoutConfirmationDismiss
})

export type AuthActionsUnion = typeof all;
