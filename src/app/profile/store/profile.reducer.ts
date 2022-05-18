import { createReducer, on } from '@ngrx/store';
import { initialState } from './profile.state';
import {
  createUserProfileSuccess,
  getUserProfileSuccess,
} from './profile.actions';

const _profileReducer = createReducer(
  initialState,
  on(createUserProfileSuccess, (state, action) => {
    return {
      ...state,
      userProfile: action.userProfile,
    };
  }),
  on(getUserProfileSuccess, (state, action) => {
    return {
      ...state,
      userProfile: action.userProfile,
    };
  })
);

export function ProfileReducer(state: any, action: any) {
  return _profileReducer(state, action);
}
