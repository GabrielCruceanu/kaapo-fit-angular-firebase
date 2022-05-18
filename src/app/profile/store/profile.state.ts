import { UserProfile } from '../model/userProfile.model';

export interface ProfileState {
  userProfile: UserProfile | null;
}

export const initialState: ProfileState = {
  userProfile: null,
};
