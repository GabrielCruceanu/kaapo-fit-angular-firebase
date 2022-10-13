import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@/environments/environment';
import { UserAuth } from '../model/userAuth.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { autoLogout } from '../store/auth.actions';
import { AuthResponseData } from '../model/AuthResponseData.model';
import { Observable } from 'rxjs';
import { UserProfile } from '../../profile/model/userProfile.model';
import { UserImage, UserType } from '../../profile/model/profile-interface';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { getAuth, sendPasswordResetEmail } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  timeoutInterval: any;

  constructor(
    private http: HttpClient,
    private store: Store<AppState>,
    private firestore: Firestore
  ) {}

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

  async onCheckUsername(username: string): Promise<boolean> {
    const docRef = doc(this.firestore, 'usernames', username);
    const docSnap = await getDoc(docRef);

    return !!docSnap.exists();
  }

  onResetPassword(email: string) {
    const auth = getAuth();
    return sendPasswordResetEmail(auth, email);
  }

  formatUser(data: AuthResponseData) {
    const expirationDate = new Date(
      new Date().getTime() + +data.expiresIn * 1000
    );
    return new UserAuth(data.localId, data.email, data.idToken, expirationDate);
  }

  formatUserProfileForDb(
    user: UserAuth,
    username: string,
    hasProfile: boolean,
    dayJoined: number,
    monthJoined: number,
    yearJoined: number,
    userType: UserType | null,
    coverImage: UserImage | null,
    profileImage: UserImage | null
  ) {
    const { id, email } = user;

    return new UserProfile(
      id,
      email,
      username,
      hasProfile,
      dayJoined,
      monthJoined,
      yearJoined,
      userType,
      coverImage,
      profileImage
    );
  }

  getErrorMessage(message: string) {
    switch (message) {
      case 'EMAIL_NOT_FOUND':
        return 'Adresa de email nu a fost gasita';
      case 'INVALID_PASSWORD':
        return 'Parola invalida';
      case 'EMAIL_EXISTS':
        return 'Adresa de email exista deja';
      case 'MISSING_CUSTOM_TOKEN':
        return 'Lipseste simbolul personalizat';
      default:
        return 'A aparut o eroare necunoscuta. Incerca din nou';
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
    localStorage.removeItem('clientProfileData');
    localStorage.removeItem('gymProfileData');
    localStorage.removeItem('trainerProfileData');
    localStorage.removeItem('nutritionistProfileData');
    if (this.timeoutInterval) {
      clearTimeout(this.timeoutInterval);
      this.timeoutInterval = null;
    }
  }
}
