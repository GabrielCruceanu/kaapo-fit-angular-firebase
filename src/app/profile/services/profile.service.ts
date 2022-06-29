import { Injectable, OnDestroy } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { Observable, Subscription } from 'rxjs';
import {
  doc,
  docData,
  Firestore,
  setDoc,
  updateDoc,
} from '@angular/fire/firestore';
import { traceUntilFirst } from '@angular/fire/performance';
import {
  ClientPhysicalDetails,
  ClientProfile,
} from '../model/clientProfile.model';
import { UserProfile } from '../model/userProfile.model';
import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { GymProfile } from '../model/gym.model';
import { TrainerProfile } from '../model/trainerProfile.model';
import { NutritionistProfile } from '../model/nutritionistProfile.model';
import { getUserProfile } from '../store/profile.selector';
import { Review } from '@/app/profile/model/review.model';
import { AngularFirestore } from '@angular/fire/compat/firestore';

export const _filer = (opt: string[], value: string): string[] => {
  const filterValue = value.toLowerCase();

  return opt.filter((item) => item.toLowerCase().includes(filterValue));
};

@Injectable({
  providedIn: 'root',
})
export class ProfileService implements OnDestroy {
  userProfile: UserProfile | null;
  userProfileSub: Subscription | undefined;
  usersProfile: UserProfile[] | null;
  usersProfileSub: Subscription | undefined;

  constructor(
    private store: Store<AppState>,
    private http: HttpClient,
    private firestore: Firestore,
    private afs: AngularFirestore
  ) {
    this.userProfileSub = this.store
      .select(getUserProfile)
      .subscribe((userProfile) => {
        this.userProfile = userProfile;
      });
    // this.usersProfileSub = this.store.select(getUsers).subscribe((users) => {
    //   this.usersProfile = users;
    // });
  }

  // ****************** USER ******************
  setUserProfileInLocalStorage(userProfile: UserProfile) {
    localStorage.setItem('userProfileData', JSON.stringify(userProfile));
  }

  getUserProfileFromLocalStorage() {
    const userProfileDataString = localStorage.getItem('userProfileData');
    if (userProfileDataString) {
      const userData = JSON.parse(userProfileDataString);

      return new UserProfile(
        userData.id,
        userData.email,
        userData.hasProfile,
        userData.dayJoined,
        userData.monthJoined,
        userData.yearJoined,
        userData.userType,
        userData.coverImage,
        userData.profileImage
      );
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
    console.log('getUserProfileFromDb');
    const docRef = doc(this.firestore, 'users', idProfile);

    return docData(docRef).pipe(traceUntilFirst('firestore'));
    // console.log('getUserProfileFromDb', idProfile);
    // let userProfile: UserProfile;
    // this.usersProfile.map((user) => {
    //   if (user && user.id === idProfile) {
    //     userProfile = user;
    //     console.log('user', user);
    //   }
    // });
    // console.log('getUserProfileFromDb > userProfile', userProfile);
    // return of(userProfile);
  }

  public getUsersFromDb(): Observable<UserProfile[]> {
    const clientsCollection = this.afs.collection<UserProfile>('users');

    return clientsCollection.valueChanges();
  }

  // ****************** CLIENT ******************
  public createClientProfileInDb(clientProfile: ClientProfile) {
    const ref = doc(this.firestore, 'clients', clientProfile.id);
    setDoc(ref, {
      ...clientProfile,
    });
  }

  public getClientsFromDb(): Observable<ClientProfile[]> {
    const clientsCollection = this.afs.collection<ClientProfile>('clients');

    return clientsCollection.valueChanges();
  }

  public getClientProfileFromDb(idProfile: string) {
    const docRef = doc(this.firestore, 'clients', idProfile);

    return docData(docRef).pipe(traceUntilFirst('firestore'));
  }

  setClientProfileInLocalStorage(clientProfile: ClientProfile) {
    localStorage.setItem('clientProfileData', JSON.stringify(clientProfile));
  }

  getClientProfileFromLocalStorage() {
    const clientProfileDataString = localStorage.getItem('clientProfileData');
    if (clientProfileDataString) {
      const clientData = JSON.parse(clientProfileDataString);

      return new ClientProfile(
        clientData.id,
        clientData.status,
        clientData.firstName,
        clientData.lastName,
        clientData.name,
        clientData.email,
        clientData.phone,
        clientData.gender,
        clientData.country,
        clientData.state,
        clientData.city,
        clientData.hasPremium,
        clientData.birth,
        clientData.joined,
        clientData.profilePicture,
        clientData.currentPhysicalDetails,
        clientData.historyPhysicalDetails,
        clientData.nutritionist,
        clientData.trainer,
        clientData.gym
      );
    }
    return null;
  }

  public setCurrentPhysicalDetailsInDb(
    clientId: string,
    currentPhysicalDetails: ClientPhysicalDetails
  ) {
    const ref = doc(this.firestore, 'clients', clientId);

    updateDoc(ref, {
      currentPhysicalDetails: {
        ...currentPhysicalDetails,
      },
    });
  }

  public setHistoryPhysicalDetailsInDb(
    clientId: string,
    clientPhysicalDetails: ClientPhysicalDetails
  ) {
    const ref = doc(
      this.firestore,
      'clients',
      clientId,
      'historyPhysicalDetails',
      clientPhysicalDetails.id
    );

    setDoc(ref, {
      ...clientPhysicalDetails,
    });
  }

  public getHistoryPhysicalDetailsFromDb(clientId: string) {
    const docRef = doc(this.firestore, 'clients', clientId);

    return docData(docRef).pipe(traceUntilFirst('firestore'));
  }

  // ****************** GYM ******************
  public createGymProfileInDb(gymProfile: GymProfile) {
    const ref = doc(this.firestore, 'gyms', gymProfile.id);
    setDoc(ref, {
      ...gymProfile,
    });
  }

  public getGymsFromDb(): Observable<GymProfile[]> {
    const clientsCollection = this.afs.collection<GymProfile>('gyms');

    return clientsCollection.valueChanges();
  }

  public getGymProfileFromDb(idProfile: string) {
    const docRef = doc(this.firestore, 'gyms', idProfile);

    return docData(docRef).pipe(traceUntilFirst('firestore'));
  }

  setGymProfileInLocalStorage(gymProfile: GymProfile) {
    localStorage.setItem('gymProfileData', JSON.stringify(gymProfile));
  }

  getGymProfileFromLocalStorage() {
    const gymProfileDataString = localStorage.getItem('gymProfileData');
    if (gymProfileDataString) {
      const gymData = JSON.parse(gymProfileDataString);

      return new GymProfile(
        gymData.id,
        gymData.status,
        gymData.firstName,
        gymData.lastName,
        gymData.name,
        gymData.joined,
        gymData.hasProPremium,
        gymData.gymType,
        gymData.country,
        gymData.state,
        gymData.city,
        gymData.street,
        gymData.strNo,
        gymData.contact,
        gymData.description,
        gymData.coverPicture,
        gymData.profilePicture,
        gymData.gallery,
        gymData.reviews,
        gymData.personal
      );
    }
    return null;
  }

  // ****************** TRAINER ******************
  public createTrainerProfileInDb(trainerProfile: TrainerProfile) {
    const ref = doc(this.firestore, 'trainers', trainerProfile.id);
    setDoc(ref, {
      ...trainerProfile,
    });
  }

  public getTrainersFromDb(): Observable<TrainerProfile[]> {
    const clientsCollection = this.afs.collection<TrainerProfile>('trainers');

    return clientsCollection.valueChanges();
  }

  public getTrainerProfileFromDb(idProfile: string) {
    const docRef = doc(this.firestore, 'trainers', idProfile);

    return docData(docRef).pipe(traceUntilFirst('firestore'));
  }

  setTrainerProfileInLocalStorage(trainerProfile: TrainerProfile) {
    localStorage.setItem('trainerProfileData', JSON.stringify(trainerProfile));
  }

  getTrainerProfileFromLocalStorage() {
    const trainerProfileDataString = localStorage.getItem('trainerProfileData');
    if (trainerProfileDataString) {
      const trainerData = JSON.parse(trainerProfileDataString);

      return new TrainerProfile(
        trainerData.id,
        trainerData.status,
        trainerData.firstName,
        trainerData.lastName,
        trainerData.name,
        trainerData.trainerType,
        trainerData.gender,
        trainerData.joined,
        trainerData.birth,
        trainerData.hasProPremium,
        trainerData.certificate,
        trainerData.experience,
        trainerData.country,
        trainerData.state,
        trainerData.city,
        trainerData.contact,
        trainerData.description,
        trainerData.completedClients,
        trainerData.coverPicture,
        trainerData.profilePicture,
        trainerData.activeClients,
        trainerData.gallery,
        trainerData.reviews
      );
    }
    return null;
  }

  // ****************** NUTRITIONIST ******************
  public createNutritionistProfileInDb(
    nutritionistProfile: NutritionistProfile
  ) {
    const ref = doc(this.firestore, 'nutritionists', nutritionistProfile.id);
    setDoc(ref, {
      ...nutritionistProfile,
    });
  }

  public getNutritionistsFromDb(): Observable<NutritionistProfile[]> {
    const clientsCollection =
      this.afs.collection<NutritionistProfile>('nutritionists');

    return clientsCollection.valueChanges();
  }

  public getNutritionistProfileFromDb(idProfile: string) {
    const docRef = doc(this.firestore, 'nutritionists', idProfile);

    return docData(docRef).pipe(traceUntilFirst('firestore'));
  }

  setNutritionistProfileInLocalStorage(
    nutritionistProfile: NutritionistProfile
  ) {
    localStorage.setItem(
      'nutritionistProfileData',
      JSON.stringify(nutritionistProfile)
    );
  }

  getNutritionistProfileFromLocalStorage() {
    const nutritionistProfileDataString = localStorage.getItem(
      'nutritionistProfileData'
    );
    if (nutritionistProfileDataString) {
      const nutritionistData = JSON.parse(nutritionistProfileDataString);

      return new NutritionistProfile(
        nutritionistData.id,
        nutritionistData.status,
        nutritionistData.firstName,
        nutritionistData.lastName,
        nutritionistData.name,
        nutritionistData.gender,
        nutritionistData.joined,
        nutritionistData.birth,
        nutritionistData.hasProPremium,
        nutritionistData.certificate,
        nutritionistData.experience,
        nutritionistData.country,
        nutritionistData.state,
        nutritionistData.city,
        nutritionistData.contact,
        nutritionistData.description,
        nutritionistData.completedClients,
        nutritionistData.coverPicture,
        nutritionistData.profilePicture,
        nutritionistData.activeClients,
        nutritionistData.gallery,
        nutritionistData.reviews
      );
    }
    return null;
  }

  public disableInput(formGroup: any, disableInput: string, input: string) {
    formGroup.controls[input].status === 'VALID'
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
    console.log('checkIfUserHasProfile > this.userProfile', this.userProfile);
    return !!this.userProfile?.hasProfile;
  }

  public getReviewsFromDb(): Observable<Review[]> {
    const clientsCollection = this.afs.collection<Review>('reviews');

    return clientsCollection.valueChanges();
  }

  ngOnDestroy() {
    if (this.userProfileSub) {
      this.userProfileSub.unsubscribe();
    } else if (this.usersProfileSub) {
      this.usersProfileSub.unsubscribe();
    }
  }
}
