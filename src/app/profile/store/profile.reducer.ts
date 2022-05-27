import { createReducer, on } from '@ngrx/store';
import { initialState } from './profile.state';
import {
  createClientProfileSuccess,
  createGymProfileSuccess,
  createNutritionistProfileSuccess,
  createTrainerProfileSuccess,
  createUserProfileSuccess,
  getClientProfileSuccess,
  getGymProfileSuccess,
  getNutritionistProfileSuccess,
  getTrainerProfileSuccess,
  getUserProfileSuccess,
  setUserCoverImage,
  setUserProfileImage,
} from './profile.actions';
import { autoLogout } from '../../auth/store/auth.actions';

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
  on(setUserProfileImage, (state, action) => {
    return {
      ...state,
      profileImage: action.profileImage,
    };
  }),
  on(setUserCoverImage, (state, action) => {
    return {
      ...state,
      coverImage: action.coverImage,
    };
  }),
  on(createClientProfileSuccess, (state, action) => {
    return {
      ...state,
      clientProfile: action.clientProfile,
    };
  }),
  on(getClientProfileSuccess, (state, action) => {
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
  on(getGymProfileSuccess, (state, action) => {
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
  on(getTrainerProfileSuccess, (state, action) => {
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
  }),
  on(getNutritionistProfileSuccess, (state, action) => {
    return {
      ...state,
      nutritionistProfile: action.nutritionistProfile,
    };
  }),
  on(autoLogout, () => {
    return {
      ...initialState,
    };
  })
);

export function ProfileReducer(state: any, action: any) {
  return _profileReducer(state, action);
}
