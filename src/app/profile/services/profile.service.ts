import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { getToken } from '../../auth/store/auth.selector';
import { Subscription, switchMap, take } from 'rxjs';
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
import { TrainerProfile } from '../model/trainerProfile.model';
import { NutritionistProfile } from '../model/nutritionistProfile.model';
import { getUserProfile } from '../store/profile.selector';
import { Router } from '@angular/router';

export const _filer = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter((item) => item.toLowerCase().includes(filterValue));
};

@Injectable({
  providedIn: 'root',
})
export class ProfileService implements OnDestroy {
  userProfile?: UserProfile | null;
  userProfileSub: Subscription | undefined;

  constructor(
    private store: Store<AppState>,
    private http: HttpClient,
    private firestore: Firestore,
    private router: Router
  ) {
    this.userProfileSub = this.store
      .select(getUserProfile)
      .subscribe((userProfile) => {
        this.userProfile = userProfile;
      });
  }

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
        userData.yearJoined,
        userData.userType
      );
      return userProfile;
    }
    return null;
  }

  setClientProfileInLocalStorage(clientProfile: ClientProfile) {
    localStorage.setItem('clientProfileData', JSON.stringify(clientProfile));
  }

  getClientProfileFromLocalStorage() {
    const clientProfileDataString = localStorage.getItem('clientProfileData');
    if (clientProfileDataString) {
      const userData = JSON.parse(clientProfileDataString);

      const clientProfile = new ClientProfile(
        userData.id,
        userData.status,
        userData.firstName,
        userData.lastName,
        userData.name,
        userData.email,
        userData.phone,
        userData.gender,
        userData.country,
        userData.state,
        userData.city,
        userData.hasPremium,
        userData.birth,
        userData.joined,
        userData.profilePicture,
        userData.history,
        userData.nutritionist,
        userData.trainer,
        userData.gym
      );
      return clientProfile;
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

  public getClientProfileFromDb(idProfile: string) {
    const docRef = doc(this.firestore, 'clients', idProfile);

    return docData(docRef).pipe(traceUntilFirst('firestore'));
  }

  public createGymProfileInDb(gymProfile: GymProfile) {
    const ref = doc(this.firestore, 'gyms', gymProfile.id);
    setDoc(ref, {
      ...gymProfile,
    });
  }

  public getGymProfileFromDb(idProfile: string) {
    const docRef = doc(this.firestore, 'gyms', idProfile);

    return docData(docRef).pipe(traceUntilFirst('firestore'));
  }

  public createTrainerProfileInDb(trainerProfile: TrainerProfile) {
    const ref = doc(this.firestore, 'trainers', trainerProfile.id);
    setDoc(ref, {
      ...trainerProfile,
    });
  }

  public getTrainerProfileFromDb(idProfile: string) {
    const docRef = doc(this.firestore, 'trainers', idProfile);

    return docData(docRef).pipe(traceUntilFirst('firestore'));
  }

  public createNutritionistProfileInDb(
    nutritionistProfile: NutritionistProfile
  ) {
    const ref = doc(this.firestore, 'nutritionists', nutritionistProfile.id);
    setDoc(ref, {
      ...nutritionistProfile,
    });
  }

  public getNutritionistProfileFromDb(idProfile: string) {
    const docRef = doc(this.firestore, 'nutritionists', idProfile);

    return docData(docRef).pipe(traceUntilFirst('firestore'));
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

  public checkIfUserHasProfile(): boolean {
    console.log(
      '!!this.userProfile?.hasProfile',
      !!this.userProfile?.hasProfile
    );
    return !!this.userProfile?.hasProfile;
  }

  ngOnDestroy() {
    if (this.userProfileSub) {
      this.userProfileSub.unsubscribe();
    }
  }
}
