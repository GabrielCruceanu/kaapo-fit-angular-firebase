import { Action, createReducer, on } from '@ngrx/store';
import { AuthState, initialState } from './auth.state';
import {
  autoLogout,
  loginFail,
  loginSuccess,
  signupSuccess,
} from './auth.actions';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(signupSuccess, (state, action) => {
    return {
      ...state,
      user: action.user,
    };
  }),
  on(autoLogout, (state) => {
    return {
      ...state,
      user: null,
    };
  })
);

export function AuthReducer(state: any, action: any) {
  return _authReducer(state, action);
}
