import { UserProfile } from '../model/userProfile.model';
import { ClientProfile } from '../model/clientProfile.model';

export interface ProfileState {
  userProfile: UserProfile | null;
  clientProfile: ClientProfile | null;
}

export const initialState: ProfileState = {
  userProfile: null,
  clientProfile: null,
};
