import { AuthState } from '@/app/features/auth/store/auth.state';
import { AuthReducer } from '@/app/features/auth/store/auth.reducer';
import { AUTH_STATE_NAME } from '@/app/features/auth/store/auth.selector';
import { routerReducer, RouterReducerState } from '@ngrx/router-store';
import { SHARED_STATE_NAME } from './shared/shared.selector';
import { SharedState } from './shared/shared.state';
import { SharedReducer } from './shared/shared.reducer';
import { PROFILE_STATE_NAME } from '../profile/store/profile.selector';
import { ProfileState } from '../profile/store/profile.state';
import { ProfileReducer } from '../profile/store/profile.reducer';

export interface AppState {
  [SHARED_STATE_NAME]: SharedState;
  [AUTH_STATE_NAME]: AuthState;
  [PROFILE_STATE_NAME]: ProfileState;
  router: RouterReducerState;
}

export const appReducer = {
  [SHARED_STATE_NAME]: SharedReducer,
  [AUTH_STATE_NAME]: AuthReducer,
  [PROFILE_STATE_NAME]: ProfileReducer,
  router: routerReducer,
};
