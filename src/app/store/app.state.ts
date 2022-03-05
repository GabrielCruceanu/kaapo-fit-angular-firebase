import { AuthState } from '../auth/store/auth.state';
import { AuthReducer } from '../auth/store/auth.reducer';
import { AUTH_STATE_NAME } from '../auth/store/auth.selector';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import {SHARED_STATE_NAME} from "./shared/shared.selector";
import {SharedState} from "./shared/shared.state";
import {SharedReducer} from "./shared/shared.reducer";

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
  [AUTH_STATE_NAME]: AuthState;
  router: RouterReducerState;
}

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: AuthReducer,
  router: routerReducer,
};
