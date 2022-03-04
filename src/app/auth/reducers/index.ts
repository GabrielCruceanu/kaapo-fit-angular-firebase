import * as fromRoot from '../../reducers';
import * as fromAuth from './auth.reducer';
import * as fromLoginPage from './login-page.reducer';
import { AuthActions } from '../actions';
import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';

export const authFeatureKey = 'auth';

export interface AuthState {
  status: fromAuth.State;
  loginPage: fromLoginPage.State;
}

export interface State extends fromRoot.State {
  auth: AuthState;
}

export const reducers: ActionReducerMap<
  AuthState,
  AuthActions.AuthActionsUnion
> = {
  status: fromAuth.reducer,
  loginPage: fromLoginPage.reducer,
};

export const selectAuthState = createFeatureSelector<AuthState>('auth');

export const selectAuthStatusState = createSelector(
  selectAuthState,
  (state: AuthState) => state.status
);

export const selectUser = createSelector(
  selectAuthStatusState,
  fromAuth.getUser
);
export const selectLoggedIn = createSelector(selectUser, (user) => !!user);

export const selectLoginPageState = createSelector(
  selectAuthState,
  (state: AuthState) => state.loginPage
);

export const getLoginPageError = createSelector(
  selectLoginPageState,
  fromLoginPage.getError
);

export const getLoginPagePending = createSelector(
  selectLoginPageState,
  fromLoginPage.getPending
);
