import { createAction, props } from '@ngrx/store';

export const CREATE_PROFILE_START = '[profile page] create profile start';
export const CREATE_PROFILE_SUCCESS = '[profile page] create profile Success';
export const CREATE_PROFILE_FAIL = '[profile page] create profile Fail';

export const GET_PROFILE_START = '[profile page] get profile start';
export const GET_PROFILE_SUCCESS = '[profile page] get profile Success';
export const GET_PROFILE_FAIL = '[profile page] get profile Fail';

export const getProfileStart = createAction(
  GET_PROFILE_START,
  props<{ id: number }>()
);
