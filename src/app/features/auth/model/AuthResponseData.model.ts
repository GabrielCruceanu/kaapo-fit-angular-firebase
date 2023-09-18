export interface AuthResponseData {
  idToken: string;
  email: string;
  username: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

export enum AuthType {
  Login = 'login',
  SignUp = 'sign-up',
  ResetPassword = 'reset-password',
}
