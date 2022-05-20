import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { getToken } from '../../auth/store/auth.selector';
import { switchMap, take } from 'rxjs';
import {
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { traceUntilFirst } from '@angular/fire/performance';
import { ClientProfile } from '../model/clientProfile.model';
import { UserProfile } from '../model/userProfile.model';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { GymProfile } from '../model/gym.model';

export const _filer = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter((item) => item.toLowerCase().includes(filterValue));
};

@Injectable({
  providedIn: 'root',
})
export class ProfileService {
  constructor(
    private store: Store<AppState>,
    private http: HttpClient,
    private firestore: Firestore
  ) {}

  uploadImage(image: File) {
    const uploadData = new FormData();
    uploadData.append('image', image);

    return this.store.select(getToken).pipe(
      take(1),
      switchMap((token) => {
        return this.http.post<{ imageUrl: string; imagePath: string }>(
          '',
          uploadData,
          { headers: { Authorization: 'Bearer ' + token } }
        );
      })
    );
  }

  setUserProfileInLocalStorage(userProfile: UserProfile) {
    localStorage.setItem('userProfileData', JSON.stringify(userProfile));
  }

  getUserProfileFromLocalStorage() {
    const userProfileDataString = localStorage.getItem('userProfileData');
    if (userProfileDataString) {
      const userData = JSON.parse(userProfileDataString);

      const userProfile = new UserProfile(
        userData.id,
        userData.email,
        userData.hasProfile,
        userData.dayJoined,
        userData.monthJoined,
        userData.yearJoined
      );
      return userProfile;
    }
    return null;
  }

  public createUserProfileInDb(userProfile: UserProfile) {
    const ref = doc(this.firestore, 'users', userProfile.id);
    setDoc(ref, {
      ...userProfile,
    });
  }

  public updateUserProfileInDb(userProfile: UserProfile) {
    const ref = doc(this.firestore, 'users', userProfile.id);
    updateDoc(ref, {
      ...userProfile,
    });
  }

  public getUserProfileFromDb(idProfile: string) {
    const docRef = doc(this.firestore, 'users', idProfile);

    return docData(docRef).pipe(traceUntilFirst('firestore'));
  }

  public createClientProfileInDb(clientProfile: ClientProfile) {
    const ref = doc(this.firestore, 'clients', clientProfile.id);
    setDoc(ref, {
      ...clientProfile,
    });
  }

  public createGymProfileInDb(gymProfile: GymProfile) {
    const ref = doc(this.firestore, 'gyms', gymProfile.id);
    setDoc(ref, {
      ...gymProfile,
    });
  }

  public disableInput(formGroup: any, disableInput: string, input: string) {
    formGroup.controls[input].valid
      ? formGroup.controls[disableInput].enable()
      : formGroup.controls[disableInput].disable();
  }

  public countryInputValidation(countries: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const countryValue = countries.find((country) => country === value);

      return !countryValue ? { isNotCountryFromList: true } : null;
    };
  }

  public stateInputValidation(states: string[]): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const value = control.value;

      if (!value) {
        return null;
      }

      const sateValue = states.find((state) => state === value);

      return !sateValue ? { isNotStateFromList: true } : null;
    };
  }
}
