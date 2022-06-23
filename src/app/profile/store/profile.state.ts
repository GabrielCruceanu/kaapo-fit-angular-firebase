import { UserProfile } from '../model/userProfile.model';
import { ClientProfile } from '../model/clientProfile.model';
import { GymProfile } from '../model/gym.model';
import { TrainerProfile } from '../model/trainerProfile.model';
import { NutritionistProfile } from '../model/nutritionistProfile.model';
import { Review } from '@/app/profile/model/review.model';

export interface ProfileState {
  userProfile: UserProfile | null;
  clientProfile: ClientProfile | null;
  gymProfile: GymProfile | null;
  trainerProfile: TrainerProfile | null;
  nutritionistProfile: NutritionistProfile | null;
  reviews: Review[] | null;
}

export const initialState: ProfileState = {
  userProfile: null,
  clientProfile: null,
  gymProfile: null,
  trainerProfile: null,
  nutritionistProfile: null,
  reviews: null,
};
