import { createFeatureSelector, createSelector } from '@ngrx/store';
import { SharedState } from './shared.state';

export const SHARED_STATE_NAME = 'shared';

const getSharedState = createFeatureSelector<SharedState>(SHARED_STATE_NAME);

export const getLoading = createSelector(getSharedState, (state) => {
  return state.showLoading;
});

export const getErrorMessage = createSelector(getSharedState, (state) => {
  return state.errorMessage;
});

export const getUsers = createSelector(getSharedState, (state) => {
  return state.users;
});

export const getClients = createSelector(getSharedState, (state) => {
  return state.clients;
});

export const getGyms = createSelector(getSharedState, (state) => {
  return state.gyms;
});

export const getTrainers = createSelector(getSharedState, (state) => {
  return state.trainers;
});

export const getNutritionists = createSelector(getSharedState, (state) => {
  return state.nutritionists;
});

export const getReviews = createSelector(getSharedState, (state) => {
  return state.reviews;
});
