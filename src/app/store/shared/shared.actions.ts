import { createAction, props } from '@ngrx/store';
import { ClientProfile } from '@/app/profile/model/clientProfile.model';
import { GymProfile } from '@/app/profile/model/gym.model';
import { TrainerProfile } from '@/app/profile/model/trainerProfile.model';
import { NutritionistProfile } from '@/app/profile/model/nutritionistProfile.model';
import { Review } from '@/app/profile/model/review.model';
import { UserProfile } from '@/app/profile/model/userProfile.model';

export const SET_LOADING_ACTION = '[Shared state] Set loading spinner';
export const SET_ERROR_MESSAGE = '[Shared state] Set error message';

export const GET_USERS_START = '[Shared page] get users start';
export const GET_USERS_SUCCESS = '[Shared page] get users success';

export const GET_CLIENTS_START = '[Shared page] get clients start';
export const GET_CLIENTS_SUCCESS = '[Shared page] get client success';

export const GET_GYMS_START = '[Shared page] get gyms start';
export const GET_GYMS_SUCCESS = '[Shared page] get gyms success';

export const GET_TRAINERS_START = '[Shared page] get trainers start';
export const GET_TRAINERS_SUCCESS = '[Shared page] get trainers success';

export const GET_NUTRITIONISTS_START = '[Shared page] get nutritionists start';
export const GET_NUTRITIONISTS_SUCCESS =
  '[Shared page] get nutritionists success';

export const GET_REVIEWS_START = '[Shared page] get reviews start';
export const GET_REVIEWS_SUCCESS = '[Shared page] get reviews success';

export const setLoadingSpinner = createAction(
  SET_LOADING_ACTION,
  props<{ status: boolean }>()
);

export const setErrorMessage = createAction(
  SET_ERROR_MESSAGE,
  props<{ message: string }>()
);

// ---> Get Users <---

export const getUsersStart = createAction(GET_USERS_START);

export const getUsersSuccess = createAction(
  GET_USERS_SUCCESS,
  props<{ users: UserProfile[] | [] }>()
);

// ---> Get Clients <---

export const getClientsStart = createAction(GET_CLIENTS_START);

export const getClientsSuccess = createAction(
  GET_CLIENTS_SUCCESS,
  props<{ clients: ClientProfile[] | [] }>()
);

// ---> Get Gyms <---

export const getGymsStart = createAction(GET_GYMS_START);

export const getGymsSuccess = createAction(
  GET_GYMS_SUCCESS,
  props<{ gyms: GymProfile[] | [] }>()
);

// ---> Get Trainers <---

export const getTrainersStart = createAction(GET_TRAINERS_START);

export const getTrainersSuccess = createAction(
  GET_TRAINERS_SUCCESS,
  props<{ trainers: TrainerProfile[] | [] }>()
);

// ---> Get Nutritionists <---

export const getNutritionistsStart = createAction(GET_NUTRITIONISTS_START);

export const getNutritionistsSuccess = createAction(
  GET_NUTRITIONISTS_SUCCESS,
  props<{ nutritionists: NutritionistProfile[] | [] }>()
);

// ---> Get Reviews <---

export const getReviewsStart = createAction(GET_REVIEWS_START);

export const getReviewsSuccess = createAction(
  GET_REVIEWS_SUCCESS,
  props<{ reviews: Review[] | [] }>()
);
