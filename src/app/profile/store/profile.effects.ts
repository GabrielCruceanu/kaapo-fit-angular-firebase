import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { ProfileService } from '../services/profile.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Router } from '@angular/router';
import {
  createClientProfileStart,
  createClientProfileSuccess,
  createGymProfileStart,
  createGymProfileSuccess,
  createNutritionistProfileStart,
  createNutritionistProfileSuccess,
  createTrainerProfileStart,
  createTrainerProfileSuccess,
  createUserProfileStart,
  createUserProfileSuccess,
  getClientHistoryPhysicalDetails,
  getClientProfileStart,
  getClientProfileSuccess,
  getGymProfileStart,
  getGymProfileSuccess,
  getNutritionistProfileStart,
  getNutritionistProfileSuccess,
  getTrainerProfileStart,
  getTrainerProfileSuccess,
  getUserProfileStart,
  getUserProfileSuccess,
  setCurrentPhysicalDetailsStart,
  setClientCurrentPhysicalDetailsSuccess,
  setClientHistoryPhysicalDetailsStart,
  setClientHistoryPhysicalDetailsSuccess,
  updateUserProfileStart,
  updateUserProfileSuccess,
} from './profile.actions';
import { map, switchMap, tap } from 'rxjs';
import {
  getReviewsStart,
  setErrorMessage,
  setLoadingSpinner,
} from '../../store/shared/shared.actions';
import { AuthService } from '../../auth/services/auth.service';
import { UserProfile } from '../model/userProfile.model';
import {
  ClientPhysicalDetails,
  ClientProfile,
} from '../model/clientProfile.model';
import { GymProfile } from '../model/gym.model';
import { TrainerProfile } from '../model/trainerProfile.model';
import { NutritionistProfile } from '../model/nutritionistProfile.model';
import { UserType } from '../model/profile-interface';
import { UploadImageService } from '@/app/shared/services/upload-image/upload-image.service';

@Injectable()
export class ProfileEffects {
  createUserProfileStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createUserProfileStart),
      map((action) => {
        this.profileService.setUserProfileInLocalStorage(action.userProfile);
        this.profileService.createUserProfileInDb(action.userProfile);

        this.store.dispatch(setLoadingSpinner({ status: false }));

        return createUserProfileSuccess({
          userProfile: action.userProfile,
          redirect: true,
        });
      })
    );
  });

  updateUserProfileStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(updateUserProfileStart),
      map((action) => {
        this.profileService.setUserProfileInLocalStorage(action.userProfile);
        this.profileService.updateUserProfileInDb(action.userProfile);

        this.store.dispatch(setLoadingSpinner({ status: false }));

        return updateUserProfileSuccess({
          userProfile: action.userProfile,
          redirect: true,
        });
      })
    );
  });

  getUserProfileStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getUserProfileStart),
      switchMap((action) => {
        return this.profileService
          .getUserProfileFromDb(action.userProfileId)
          .pipe(
            map((data) => {
              const userProfile = data as UserProfile;

              this.profileService.setUserProfileInLocalStorage(userProfile);
              this.store.dispatch(setLoadingSpinner({ status: false }));
              return getUserProfileSuccess({
                userProfile: userProfile,
                redirect: false,
              });
            })
          );
      })
    );
  });

  getUserProfileSuccess$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getUserProfileSuccess),
      map((action) => {
        const userProfile = action.userProfile;
        if (this.profileService.checkIfUserHasProfile(userProfile)) {
          switch (userProfile.userType) {
            case UserType.Client: {
              return getClientProfileStart({ clientProfileId: userProfile.id });
            }
            case UserType.Gym: {
              return getGymProfileStart({ gymProfileId: userProfile.id });
            }
            case UserType.Trainer: {
              return getTrainerProfileStart({
                trainerProfileId: userProfile.id,
              });
            }
            case UserType.Nutritionist: {
              return getNutritionistProfileStart({
                nutritionistProfileId: userProfile.id,
              });
            }
          }
        } else {
          this.router.navigate(['/profil/selectare-profil']);
        }

        return getReviewsStart();
      })
    );
  });

  createClientProfileStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createClientProfileStart),
      map((action) => {
        this.profileService.createClientProfileInDb(action.clientProfile);

        this.store.dispatch(
          getUserProfileStart({ userProfileId: action.clientProfile.id })
        );

        this.store.dispatch(setLoadingSpinner({ status: false }));

        return createClientProfileSuccess({
          clientProfile: action.clientProfile,
          redirect: true,
        });
      })
    );
  });

  getClientProfileStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getClientProfileStart),
      switchMap((action) => {
        return this.profileService
          .getClientProfileFromDb(action.clientProfileId)
          .pipe(
            map((data) => {
              const clientProfile = data as ClientProfile;

              this.profileService.setClientProfileInLocalStorage(clientProfile);
              this.store.dispatch(setLoadingSpinner({ status: false }));
              return getClientProfileSuccess({
                clientProfile: clientProfile,
                redirect: false,
              });
            })
          );
      })
    );
  });

  setClientHistoryPhysicalDetailsStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setClientHistoryPhysicalDetailsStart),
      switchMap((action) => {
        this.profileService.setHistoryPhysicalDetailsInDb(
          action.clientId,
          action.clientPhysicalDetails
        );
        return this.profileService
          .getHistoryPhysicalDetailsFromDb(action.clientId)
          .pipe(
            map((clientProfileHistory: ClientPhysicalDetails[]) => {
              return setClientHistoryPhysicalDetailsSuccess({
                historyPhysicalDetails: clientProfileHistory,
                redirect: false,
              });
            })
          );
      })
    );
  });

  getClientHistoryPhysicalDetails$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getClientHistoryPhysicalDetails),
      switchMap((action) => {
        return this.profileService
          .getHistoryPhysicalDetailsFromDb(action.clientId)
          .pipe(
            map((clientProfileHistory: ClientPhysicalDetails[]) => {
              return setClientHistoryPhysicalDetailsSuccess({
                historyPhysicalDetails: clientProfileHistory,
                redirect: false,
              });
            })
          );
      })
    );
  });

  setClientCurrentPhysicalDetailsStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(setCurrentPhysicalDetailsStart),
      map((action) => {
        this.profileService.setCurrentPhysicalDetailsInDb(
          action.clientId,
          action.currentPhysicalDetails,
          action.folder
        );

        this.store.dispatch(setLoadingSpinner({ status: false }));

        return setClientCurrentPhysicalDetailsSuccess({
          currentPhysicalDetails: action.currentPhysicalDetails,
          redirect: true,
        });
      })
    );
  });

  createGymProfileStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createGymProfileStart),
      map((action) => {
        this.profileService.createGymProfileInDb(action.gymProfile);

        this.store.dispatch(
          getUserProfileStart({ userProfileId: action.gymProfile.id })
        );

        this.store.dispatch(setLoadingSpinner({ status: false }));

        return createGymProfileSuccess({
          gymProfile: action.gymProfile,
          redirect: true,
        });
      })
    );
  });

  getGymProfileStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getGymProfileStart),
      switchMap((action) => {
        return this.profileService
          .getGymProfileFromDb(action.gymProfileId)
          .pipe(
            map((data) => {
              const gymProfile = data as GymProfile;

              this.profileService.setGymProfileInLocalStorage(gymProfile);
              this.store.dispatch(setLoadingSpinner({ status: false }));
              return getGymProfileSuccess({
                gymProfile: gymProfile,
                redirect: false,
              });
            })
          );
      })
    );
  });

  createTrainerProfileStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createTrainerProfileStart),
      map((action) => {
        this.profileService.createTrainerProfileInDb(action.trainerProfile);

        this.store.dispatch(
          getUserProfileStart({ userProfileId: action.trainerProfile.id })
        );

        this.store.dispatch(setLoadingSpinner({ status: false }));

        return createTrainerProfileSuccess({
          trainerProfile: action.trainerProfile,
          redirect: true,
        });
      })
    );
  });

  getTrainerProfileStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getTrainerProfileStart),
      switchMap((action) => {
        return this.profileService
          .getTrainerProfileFromDb(action.trainerProfileId)
          .pipe(
            map((data) => {
              const trainerProfile = data as TrainerProfile;

              this.profileService.setTrainerProfileInLocalStorage(
                trainerProfile
              );
              this.store.dispatch(setLoadingSpinner({ status: false }));
              return getTrainerProfileSuccess({
                trainerProfile: trainerProfile,
                redirect: false,
              });
            })
          );
      })
    );
  });

  createNutritionistProfileStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(createNutritionistProfileStart),
      map((action) => {
        this.profileService.createNutritionistProfileInDb(
          action.nutritionistProfile
        );

        this.store.dispatch(
          getUserProfileStart({ userProfileId: action.nutritionistProfile.id })
        );

        this.store.dispatch(setLoadingSpinner({ status: false }));

        return createNutritionistProfileSuccess({
          nutritionistProfile: action.nutritionistProfile,
          redirect: true,
        });
      })
    );
  });

  getNutritionistProfileStart$ = createEffect(() => {
    return this.actions$.pipe(
      ofType(getNutritionistProfileStart),
      switchMap((action) => {
        return this.profileService
          .getNutritionistProfileFromDb(action.nutritionistProfileId)
          .pipe(
            map((data) => {
              const nutritionistProfile = data as NutritionistProfile;

              this.profileService.setNutritionistProfileInLocalStorage(
                nutritionistProfile
              );
              this.store.dispatch(setLoadingSpinner({ status: false }));
              return getNutritionistProfileSuccess({
                nutritionistProfile: nutritionistProfile,
                redirect: true,
              });
            })
          );
      })
    );
  });

  profileRedirect$ = createEffect(
    () => {
      return this.actions$.pipe(
        ofType(
          ...[
            createClientProfileSuccess,
            createGymProfileSuccess,
            createTrainerProfileSuccess,
            createNutritionistProfileSuccess,
            setClientCurrentPhysicalDetailsSuccess,
          ]
        ),
        tap((action) => {
          this.store.dispatch(setErrorMessage({ message: '' }));
          if (action.redirect) {
            this.router.navigateByUrl('/profil');
          }
        })
      );
    },
    { dispatch: false }
  );

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private profileService: ProfileService,
    private uploadImageService: UploadImageService,
    private authService: AuthService,
    private router: Router
  ) {}
}
