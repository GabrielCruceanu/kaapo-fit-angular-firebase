import { Action, createReducer, on } from '@ngrx/store';
import { initialState, SharedState } from './shared.state';
import {
  getClientsSuccess,
  getGymsSuccess,
  getNutritionistsSuccess,
  getReviewsSuccess,
  getTrainersSuccess,
  setErrorMessage,
  setLoadingSpinner,
} from './shared.actions';

const _sharedReducer = createReducer(
  initialState,
  on(setLoadingSpinner, (state, action) => {
    return {
      ...state,
      showLoading: action.status,
    };
  }),
  on(setErrorMessage, (state, action) => {
    return {
      ...state,
      errorMessage: action.message,
    };
  }),
  on(getClientsSuccess, (state, action) => {
    return {
      ...state,
      clients: action.clients,
    };
  }),
  on(getGymsSuccess, (state, action) => {
    return {
      ...state,
      gyms: action.gyms,
    };
  }),
  on(getTrainersSuccess, (state, action) => {
    return {
      ...state,
      trainers: action.trainers,
    };
  }),
  on(getNutritionistsSuccess, (state, action) => {
    return {
      ...state,
      nutritionists: action.nutritionists,
    };
  }),
  on(getReviewsSuccess, (state, action) => {
    return {
      ...state,
      reviews: action.reviews,
    };
  })
);

export function SharedReducer(state: SharedState | undefined, action: Action) {
  return _sharedReducer(state, action);
}
