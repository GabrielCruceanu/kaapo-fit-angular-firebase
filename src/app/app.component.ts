import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { autoLogin } from './auth/store/auth.actions';
import {
  getClientsStart,
  getGymsStart,
  getNutritionistsStart,
  getReviewsStart,
  getTrainersStart,
} from '@/app/store/shared/shared.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(private store: Store<AppState>) {
    this.store.dispatch(autoLogin());
    this.store.dispatch(getClientsStart());
    this.store.dispatch(getGymsStart());
    this.store.dispatch(getTrainersStart());
    this.store.dispatch(getNutritionistsStart());
    this.store.dispatch(getReviewsStart());
  }
}
