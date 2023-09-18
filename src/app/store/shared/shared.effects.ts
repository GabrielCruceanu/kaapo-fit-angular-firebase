import { Injectable } from '@angular/core';
import { Actions } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import { ProfileService } from '@/app/profile/services/profile.service';

@Injectable()
export class SharedEffects {
  // getUsers$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(getUsersStart),
  //     switchMap(() => {
  //       this.store.dispatch(setLoadingSpinner({ status: true }));
  //
  //       return this.profileService.getUsersFromDb().pipe(
  //         map((users) => {
  //           this.store.dispatch(setLoadingSpinner({ status: false }));
  //           return getUsersSuccess({ users: users });
  //         }),
  //         catchError((errResp) => {
  //           this.store.dispatch(setLoadingSpinner({ status: false }));
  //           const errorMessage = errResp.error.error.message;
  //
  //           return of(setErrorMessage({ message: errorMessage }));
  //         })
  //       );
  //     })
  //   );
  // });
  //
  // getClients$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(getClientsStart),
  //     switchMap(() => {
  //       this.store.dispatch(setLoadingSpinner({ status: true }));
  //
  //       return this.profileService.getClientsFromDb().pipe(
  //         map((clients) => {
  //           this.store.dispatch(setLoadingSpinner({ status: false }));
  //           return getClientsSuccess({ clients: clients });
  //         }),
  //         catchError((errResp) => {
  //           this.store.dispatch(setLoadingSpinner({ status: false }));
  //           const errorMessage = errResp.error.error.message;
  //
  //           return of(setErrorMessage({ message: errorMessage }));
  //         })
  //       );
  //     })
  //   );
  // });
  //
  // getGyms$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(getGymsStart),
  //     switchMap(() => {
  //       this.store.dispatch(setLoadingSpinner({ status: true }));
  //
  //       return this.profileService.getGymsFromDb().pipe(
  //         map((gyms) => {
  //           this.store.dispatch(setLoadingSpinner({ status: false }));
  //           return getGymsSuccess({ gyms: gyms });
  //         }),
  //         catchError((errResp) => {
  //           this.store.dispatch(setLoadingSpinner({ status: false }));
  //           const errorMessage = errResp.error.error.message;
  //
  //           return of(setErrorMessage({ message: errorMessage }));
  //         })
  //       );
  //     })
  //   );
  // });
  //
  // getTrainers$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(getTrainersStart),
  //     switchMap(() => {
  //       this.store.dispatch(setLoadingSpinner({ status: true }));
  //
  //       return this.profileService.getTrainersFromDb().pipe(
  //         map((trainers) => {
  //           this.store.dispatch(setLoadingSpinner({ status: false }));
  //           return getTrainersSuccess({ trainers: trainers });
  //         }),
  //         catchError((errResp) => {
  //           this.store.dispatch(setLoadingSpinner({ status: false }));
  //           const errorMessage = errResp.error.error.message;
  //
  //           return of(setErrorMessage({ message: errorMessage }));
  //         })
  //       );
  //     })
  //   );
  // });
  //
  // getNutritionists$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(getNutritionistsStart),
  //     switchMap(() => {
  //       this.store.dispatch(setLoadingSpinner({ status: true }));
  //
  //       return this.profileService.getNutritionistsFromDb().pipe(
  //         map((nutritionists) => {
  //           this.store.dispatch(setLoadingSpinner({ status: false }));
  //           return getNutritionistsSuccess({ nutritionists: nutritionists });
  //         }),
  //         catchError((errResp) => {
  //           this.store.dispatch(setLoadingSpinner({ status: false }));
  //           const errorMessage = errResp.error.error.message;
  //
  //           return of(setErrorMessage({ message: errorMessage }));
  //         })
  //       );
  //     })
  //   );
  // });
  //
  // getReviews$ = createEffect(() => {
  //   return this.actions$.pipe(
  //     ofType(getReviewsStart),
  //     switchMap(() => {
  //       this.store.dispatch(setLoadingSpinner({ status: true }));
  //
  //       return this.profileService.getReviewsFromDb().pipe(
  //         map((reviews) => {
  //           this.store.dispatch(setLoadingSpinner({ status: false }));
  //           return getReviewsSuccess({ reviews: reviews });
  //         }),
  //         catchError((errResp) => {
  //           this.store.dispatch(setLoadingSpinner({ status: false }));
  //           const errorMessage = errResp.error.error.message;
  //
  //           return of(setErrorMessage({ message: errorMessage }));
  //         })
  //       );
  //     })
  //   );
  // });

  constructor(
    private actions$: Actions,
    private store: Store<AppState>,
    private profileService: ProfileService
  ) {}
}
