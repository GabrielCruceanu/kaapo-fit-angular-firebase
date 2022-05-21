import { createReducer, on } from '@ngrx/store';
import { initialState } from './auth.state';
import { autoLogout, loginSuccess, signupSuccess } from './auth.actions';

const _authReducer = createReducer(
  initialState,
  on(loginSuccess, (state, action) => {
    return {
      ...state,
      userAuth: action.userAuth,
    };
  }),
  on(signupSuccess, (state, action) => {
    return {
      ...state,
      userAuth: action.userAuth,
    };
  }),
  on(autoLogout, (state) => {
    return {
      ...state,
      userAuth: null,
    };
  })
);

export function AuthReducer(state: any, action: any) {
  return _authReducer(state, action);
}
