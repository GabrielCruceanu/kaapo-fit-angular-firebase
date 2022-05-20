import { createReducer, on } from '@ngrx/store';
import { initialState } from './profile.state';
import {
  createClientProfileSuccess,
  createGymProfileSuccess,
  createNutritionistProfileSuccess,
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
  }),
  on(createNutritionistProfileSuccess, (state, action) => {
    return {
      ...state,
      nutritionistProfile: action.nutritionistProfile,
    };
  })
);

export function ProfileReducer(state: any, action: any) {
  return _profileReducer(state, action);
}
