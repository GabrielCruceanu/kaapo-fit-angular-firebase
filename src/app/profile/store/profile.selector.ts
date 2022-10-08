import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProfileState } from './profile.state';

export const PROFILE_STATE_NAME = 'profile';

const getProfileState = createFeatureSelector<ProfileState>(PROFILE_STATE_NAME);

export const getUserProfile = createSelector(getProfileState, (state) => {
  return state.userProfile ? state.userProfile : null;
});

export const getClientProfile = createSelector(getProfileState, (state) => {
  return state.clientProfile ? state.clientProfile : null;
});

export const getCurrentPhysicalDetails = createSelector(
  getProfileState,
  (state) => {
    return state.currentPhysicalDetails ? state.currentPhysicalDetails : null;
  }
);
export const getHistoryPhysicalDetails = createSelector(
  getProfileState,
  (state) => {
    return state.historyPhysicalDetails ? state.historyPhysicalDetails : null;
  }
);

export const getGymProfile = createSelector(getProfileState, (state) => {
  return state.gymProfile ? state.gymProfile : null;
});

export const getTrainerProfile = createSelector(getProfileState, (state) => {
  return state.trainerProfile ? state.trainerProfile : null;
});

export const getNutritionistProfile = createSelector(
  getProfileState,
  (state) => {
    return state.nutritionistProfile ? state.nutritionistProfile : null;
  }
);
