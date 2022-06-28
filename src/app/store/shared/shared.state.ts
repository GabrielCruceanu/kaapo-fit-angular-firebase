import { ClientProfile } from '@/app/profile/model/clientProfile.model';
import { GymProfile } from '@/app/profile/model/gym.model';
import { TrainerProfile } from '@/app/profile/model/trainerProfile.model';
import { NutritionistProfile } from '@/app/profile/model/nutritionistProfile.model';
import { Review } from '@/app/profile/model/review.model';

export interface SharedState {
  showLoading: boolean;
  errorMessage: string;
  clients: ClientProfile[] | [];
  gyms: GymProfile[] | [];
  trainers: TrainerProfile[] | [];
  nutritionists: NutritionistProfile[] | [];
  reviews: Review[] | [];
}

export const initialState: SharedState = {
  showLoading: false,
  errorMessage: '',
  clients: [],
  gyms: [],
  trainers: [],
  nutritionists: [],
  reviews: [],
};
