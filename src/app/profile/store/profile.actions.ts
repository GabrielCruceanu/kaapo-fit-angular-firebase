import { createAction, props } from '@ngrx/store';
import { UserProfile } from '../model/userProfile.model';
import { ClientProfile } from '../model/clientProfile.model';
import { GymProfile } from '../model/gym.model';
import { TrainerProfile } from '../model/trainerProfile.model';
import { NutritionistProfile } from '../model/nutritionistProfile.model';
import { UserImage } from '@/app/profile/model/profile-interface';

export const CREATE_USER_PROFILE_START =
  '[profile page] create user profile start';
export const CREATE_USER_PROFILE_SUCCESS =
  '[profile page] create user profile success';

export const UPDATE_USER_PROFILE_START =
  '[profile page] update user profile start';
export const UPDATE_USER_PROFILE_SUCCESS =
  '[profile page] update user profile success';

export const GET_USER_PROFILE_START = '[profile page] get user profile start';
export const GET_USER_PROFILE_SUCCESS =
  '[profile page] get user profile success';

export const SET_USER_PROFILE_IMAGE = '[profile page] set user profile image';

export const SET_USER_COVER_IMAGE = '[profile page] set user cover image';

export const CREATE_CLIENT_PROFILE_START =
  '[profile page] create client profile start';
export const CREATE_CLIENT_PROFILE_SUCCESS =
  '[profile page] create client profile success';

export const GET_CLIENT_PROFILE_START =
  '[profile page] get client profile start';
export const GET_CLIENT_PROFILE_SUCCESS =
  '[profile page] get client profile success';

export const CREATE_GYM_PROFILE_START =
  '[profile page] create gym profile start';
export const CREATE_GYM_PROFILE_SUCCESS =
  '[profile page] create gym profile success';

export const GET_GYM_PROFILE_START = '[profile page] get gym profile start';
export const GET_GYM_PROFILE_SUCCESS = '[profile page] get gym profile success';

export const CREATE_TRAINER_PROFILE_START =
  '[profile page] create trainer profile start';
export const CREATE_TRAINER_PROFILE_SUCCESS =
  '[profile page] create trainer profile success';

export const GET_TRAINER_PROFILE_START =
  '[profile page] get trainer profile start';
export const GET_TRAINER_PROFILE_SUCCESS =
  '[profile page] get trainer profile success';

export const CREATE_NUTRITIONIST_PROFILE_START =
  '[profile page] create nutritionist profile start';
export const CREATE_NUTRITIONIST_PROFILE_SUCCESS =
  '[profile page] create nutritionist profile success';

export const GET_NUTRITIONIST_PROFILE_START =
  '[profile page] get nutritionist profile start';
export const GET_NUTRITIONIST_PROFILE_SUCCESS =
  '[profile page] get nutritionist profile success';

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

export const setUserProfileImage = createAction(
  SET_USER_PROFILE_IMAGE,
  props<{
    profileImage: UserImage;
  }>()
);

export const setUserCoverImage = createAction(
  SET_USER_COVER_IMAGE,
  props<{
    coverImage: UserImage;
  }>()
);

export const createClientProfileStart = createAction(
  CREATE_CLIENT_PROFILE_START,
  props<{ clientProfile: ClientProfile }>()
);

export const createClientProfileSuccess = createAction(
  CREATE_CLIENT_PROFILE_SUCCESS,
  props<{ clientProfile: ClientProfile; redirect: boolean }>()
);

export const getClientProfileStart = createAction(
  GET_CLIENT_PROFILE_START,
  props<{ clientProfileId: string }>()
);

export const getClientProfileSuccess = createAction(
  GET_CLIENT_PROFILE_SUCCESS,
  props<{ clientProfile: ClientProfile; redirect: boolean }>()
);

export const createGymProfileStart = createAction(
  CREATE_GYM_PROFILE_START,
  props<{ gymProfile: GymProfile }>()
);

export const createGymProfileSuccess = createAction(
  CREATE_GYM_PROFILE_SUCCESS,
  props<{ gymProfile: GymProfile; redirect: boolean }>()
);

export const getGymProfileStart = createAction(
  GET_GYM_PROFILE_START,
  props<{ gymProfileId: string }>()
);

export const getGymProfileSuccess = createAction(
  GET_GYM_PROFILE_SUCCESS,
  props<{ gymProfile: GymProfile; redirect: boolean }>()
);

export const createTrainerProfileStart = createAction(
  CREATE_TRAINER_PROFILE_START,
  props<{ trainerProfile: TrainerProfile }>()
);

export const createTrainerProfileSuccess = createAction(
  CREATE_TRAINER_PROFILE_SUCCESS,
  props<{ trainerProfile: TrainerProfile; redirect: boolean }>()
);

export const getTrainerProfileStart = createAction(
  GET_TRAINER_PROFILE_START,
  props<{ trainerProfileId: string }>()
);

export const getTrainerProfileSuccess = createAction(
  GET_TRAINER_PROFILE_SUCCESS,
  props<{ trainerProfile: TrainerProfile; redirect: boolean }>()
);

export const createNutritionistProfileStart = createAction(
  CREATE_NUTRITIONIST_PROFILE_START,
  props<{ nutritionistProfile: NutritionistProfile }>()
);

export const createNutritionistProfileSuccess = createAction(
  CREATE_NUTRITIONIST_PROFILE_SUCCESS,
  props<{ nutritionistProfile: NutritionistProfile; redirect: boolean }>()
);

export const getNutritionistProfileStart = createAction(
  GET_NUTRITIONIST_PROFILE_START,
  props<{ nutritionistProfileId: string }>()
);

export const getNutritionistProfileSuccess = createAction(
  GET_NUTRITIONIST_PROFILE_SUCCESS,
  props<{ nutritionistProfile: NutritionistProfile; redirect: boolean }>()
);
