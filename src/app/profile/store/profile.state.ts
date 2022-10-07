import { UserProfile } from '../model/userProfile.model';
import {
  ClientPhysicalDetails,
  ClientProfile,
} from '../model/clientProfile.model';
import { GymProfile } from '../model/gym.model';
import { TrainerProfile } from '../model/trainerProfile.model';
import { NutritionistProfile } from '../model/nutritionistProfile.model';

export interface ProfileState {
  userProfile: UserProfile | null;
  clientProfile: ClientProfile | null;
  historyPhysicalDetails: ClientPhysicalDetails[] | null;
  gymProfile: GymProfile | null;
  trainerProfile: TrainerProfile | null;
  nutritionistProfile: NutritionistProfile | null;
}

export const initialState: ProfileState = {
  userProfile: null,
  clientProfile: null,
  historyPhysicalDetails: null,
  gymProfile: null,
  trainerProfile: null,
  nutritionistProfile: null,
};
