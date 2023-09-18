import { UserAuth } from '../model/userAuth.model';

export interface AuthState {
  userAuth: UserAuth | null;
}

export const initialState: AuthState = {
  userAuth: null,
};
