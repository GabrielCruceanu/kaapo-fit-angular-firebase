import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { UserAuth } from '../model/userAuth.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { autoLogout } from '../store/auth.actions';
import { AuthResponseData } from '../model/AuthResponseData.model';
import { Observable } from 'rxjs';
import { UserProfile } from '../../profile/model/userProfile.model';
import { UserType } from '../../profile/model/profile-interface';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timeoutInterval: any;

  constructor(private http: HttpClient, private store: Store<AppState>) {}

  onLogin(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.FIREBASE_API_KEY}`,
      { email, password, returnSecureToken: true }
    );
  }

  onSignUp(email: string, password: string): Observable<AuthResponseData> {
    return this.http.post<AuthResponseData>(
      `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${environment.FIREBASE_API_KEY}`,
      { email, password, returnSecureToken: true }
    );
  }

  onResetPassword(email: string) {
    return this.http.post(
      `https://identitytoolkit.googleapis.com/v1/accounts:resetPassword?key=${environment.FIREBASE_API_KEY}`,
      { email, requestType: 'PASSWORD_RESET', returnSecureToken: true }
    );
  }

  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    const user = new UserAuth(
      data.localId,
      data.email,
      data.idToken,
      expirationDate
    );
    return user;
  }

  formatUserProfileForDb(
    user: UserAuth,
    hasProfile: boolean,
    dayJoined: number,
    monthJoined: number,
    yearJoined: number,
    userType: UserType | null
  ) {
    const { id, email } = user;

    const userDb = new UserProfile(
      id,
      email,
      hasProfile,
      dayJoined,
      monthJoined,
      yearJoined,
      userType
    );

    return userDb;
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Email Not Found';
      case 'INVALID_PASSWORD':
        return 'Invalid Password';
      case 'EMAIL_EXISTS':
        return 'Email already exists';
      case 'MISSING_CUSTOM_TOKEN':
        return 'Missing custom token';
      default:
        return 'Unknown error occurred. Please try again';
    }
  }

  setUserAuthInLocalStorage(userAuth: UserAuth) {
    localStorage.setItem('userAuthData', JSON.stringify(userAuth));

    this.runTimeoutIntervalForUserAuth(userAuth);
  }

  runTimeoutIntervalForUserAuth(userAuth: UserAuth) {
    const todayDate = new Date().getTime();
    const expirationDate = userAuth.expireDate.getTime();
    const timeInterval = expirationDate - todayDate;

    this.timeoutInterval = setTimeout(() => {
      this.store.dispatch(autoLogout());
      //logout functionality or get the refresh token
    }, timeInterval);
  }

  getUserAuthFromLocalStorage() {
    const userAuthDataString = localStorage.getItem('userAuthData');
    if (userAuthDataString) {
      const userData = JSON.parse(userAuthDataString);

      const expirationDate = new Date(userData.expirationDate);
      const userAuth = new UserAuth(
        userData.id,
        userData.email,
        userData._token,
        expirationDate
      );
      this.runTimeoutIntervalForUserAuth(userAuth);
      return userAuth;
    }
    return null;
  }

  onLogout() {
    localStorage.removeItem('userAuthData');
    localStorage.removeItem('userProfileData');
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }
}
