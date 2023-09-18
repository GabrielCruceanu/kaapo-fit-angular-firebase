import { User } from '#/app/shared/interfaces/user.interface';

export enum AuthType {
  LOGIN = 'LOGIN',
  REGISTER = 'REGISTER',
  FORGOT_PASSWORD = 'FORGOT_PASSWORD',
}

export interface UserAuth {
  refreshToken: string;
  token: string;
  tokenExpires: number;
  user: User;
}
