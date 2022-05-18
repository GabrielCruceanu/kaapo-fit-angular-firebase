import { createAction, props } from '@ngrx/store';
import { UserProfile } from '../model/userProfile.model';

export const CREATE_USER_PROFILE_START =
  '[profile page] create user profile start';
export const CREATE_USER_PROFILE_SUCCESS =
  '[profile page] create user profile Success';

export const UPDATE_USER_PROFILE_START =
  '[profile page] update user profile start';
export const UPDATE_USER_PROFILE_SUCCESS =
  '[profile page] update user profile Success';

export const GET_USER_PROFILE_START = '[profile page] get user profile start';
export const GET_USER_PROFILE_SUCCESS =
  '[profile page] get user profile Success';

export const CREATE_CLIENT_PROFILE_START =
  '[profile page] create client profile start';
export const CREATE_CLIENT_PROFILE_SUCCESS =
  '[profile page] create client profile Success';

export const createUserProfileStart = createAction(
  CREATE_USER_PROFILE_START,
  props<{ userProfile: UserProfile }>()
);

export const createUserProfileSuccess = createAction(
  CREATE_USER_PROFILE_SUCCESS,
  props<{ userProfile: UserProfile; redirect: boolean }>()
);

export const updateUserProfileStart = createAction(
  UPDATE_USER_PROFILE_START,
  props<{ userProfile: UserProfile }>()
);

export const updateUserProfileSuccess = createAction(
  UPDATE_USER_PROFILE_SUCCESS,
  props<{ userProfile: UserProfile; redirect: boolean }>()
);

export const getUserProfileStart = createAction(
  GET_USER_PROFILE_START,
  props<{ userProfileId: string }>()
);

export const getUserProfileSuccess = createAction(
  GET_USER_PROFILE_SUCCESS,
  props<{ userProfile: UserProfile; redirect: boolean }>()
);

export const createClientProfileStart = createAction(
  CREATE_CLIENT_PROFILE_START,
  props<{ userProfile: UserProfile }>()
);

export const createClientProfileSuccess = createAction(
  CREATE_CLIENT_PROFILE_SUCCESS,
  props<{ userProfile: UserProfile; redirect: boolean }>()
);
