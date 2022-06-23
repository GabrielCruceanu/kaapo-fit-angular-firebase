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
  setClientGalleryBackImage,
  setClientGalleryFrontImage,
  setClientGallerySideImage,
  setClientHistoryPhysicalDetailsSuccess,
  setUserCoverImage,
  setUserProfileImage,
  setClientCurrentPhysicalDetailsSuccess,
  getReviewsSuccess,
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
  on(setClientGalleryFrontImage, (state, action) => {
    return {
      ...state,
      currentPhysicalDetails: {
        ...state,
        clientGalleryFront: action.galleryFrontImage,
      },
    };
  }),
  on(setClientGallerySideImage, (state, action) => {
    return {
      ...state,
      currentPhysicalDetails: {
        ...state,
        clientGallerySide: action.gallerySideImage,
      },
    };
  }),
  on(setClientGalleryBackImage, (state, action) => {
    return {
      ...state,
      currentPhysicalDetails: {
        ...state,
        clientGalleryBack: action.galleryBackImage,
      },
    };
  }),
  on(setClientCurrentPhysicalDetailsSuccess, (state, action) => {
    return {
      ...state,
      currentPhysicalDetails: action.currentPhysicalDetails,
    };
  }),
  on(setClientHistoryPhysicalDetailsSuccess, (state, action) => {
    return {
      ...state,
      currentPhysicalDetails: action.clientPhysicalDetails,
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
  on(getReviewsSuccess, (state, action) => {
    return {
      ...state,
      reviews: action.reviews,
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
