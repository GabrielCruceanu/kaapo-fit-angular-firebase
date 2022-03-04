export enum AuthType {
  Login = 'login',
  SignUp = 'sign-up'
}


export interface AuthResponseData {
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered: boolean;
}

export interface User {
  email: string,

}

