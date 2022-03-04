import { createAction, props } from '@ngrx/store';
import { Credentials } from '../../model/user';

export enum LoginPageActionsType {
  LOGIN = '[Auth] Login',
}

export const login = createAction(
  LoginPageActionsType.LOGIN,
  props<{ credentials: Credentials }>()
);

export type LoginPageActionsUnion = ReturnType<typeof login>;
