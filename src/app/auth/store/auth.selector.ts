import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.state';

export const AUTH_STATE_NAME = 'auth';

const getAuthState = createFeatureSelector<AuthState>(AUTH_STATE_NAME);

export const isAuthenticated = createSelector(getAuthState, (state) => {
  return state.userAuth ? true : false;
});

export const getToken = createSelector(getAuthState, (state) => {
  return state.userAuth ? state.userAuth.userToken : null;
});

export const getUserAuth = createSelector(getAuthState, (state) => {
  return state.userAuth ? state.userAuth : null;
});
