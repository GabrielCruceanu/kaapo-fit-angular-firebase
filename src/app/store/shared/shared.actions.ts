import { createAction, props } from '@ngrx/store';

export const SET_LOADING_ACTION = '[Shared state] Set loading spinner';
export const SET_ERROR_MESSAGE = '[Shared state] Set error message';

export const setLoadingSpinner = createAction(
  SET_LOADING_ACTION,
  props<{ status: boolean }>()
);

export const setErrorMessage = createAction(
  SET_ERROR_MESSAGE,
  props<{ message: string }>()
);
