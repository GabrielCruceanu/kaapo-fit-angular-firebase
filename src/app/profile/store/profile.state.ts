import { UserProfile } from '../model/userProfile.model';
import { ClientProfile } from '../model/clientProfile.model';
import { GymProfile } from '../model/gym.model';

export interface ProfileState {
  userProfile: UserProfile | null;
  clientProfile: ClientProfile | null;
  gymProfile: GymProfile | null;
}

export const initialState: ProfileState = {
  userProfile: null,
  clientProfile: null,
  gymProfile: null,
};
