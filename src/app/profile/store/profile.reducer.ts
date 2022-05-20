import { createReducer, on } from '@ngrx/store';
import { initialState } from './profile.state';
import {
  createClientProfileSuccess,
  createGymProfileSuccess,
  createTrainerProfileSuccess,
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
  }),
  on(createClientProfileSuccess, (state, action) => {
    return {
      ...state,
      clientProfile: action.clientProfile,
    };
  }),
  on(createGymProfileSuccess, (state, action) => {
    return {
      ...state,
      gymProfile: action.gymProfile,
    };
  }),
  on(createTrainerProfileSuccess, (state, action) => {
    return {
      ...state,
      trainerProfile: action.trainerProfile,
    };
  })
);

export function ProfileReducer(state: any, action: any) {
  return _profileReducer(state, action);
}
