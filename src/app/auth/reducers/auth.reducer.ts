import { User } from '@angular/fire/auth';
import { AuthActions } from '../actions';

export interface State {
  user: User | null;
}

export const initialState: State = {
  user: null,
};

export function reducer(
  state = initialState,
  action: AuthActions.AuthActionsUnion
): State {
  switch (action.type) {
    case AuthActions.loginSuccess.type: {
      return {
        ...state,
        user: action.user,
      };
    }
    case AuthActions.logout.type: {
      return {
        ...state,
        user: null,
      };
    }
    default: {
      return state;
    }
  }
}

export const getUser = (state: State) => state.user;
