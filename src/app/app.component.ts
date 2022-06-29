import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { autoLogin } from './auth/store/auth.actions';
import {
  getClientsStart,
  getGymsStart,
  getNutritionistsStart,
  getReviewsStart,
  getTrainersStart,
  getUsersStart,
} from '@/app/store/shared/shared.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(private store: Store<AppState>) {}

  ngOnInit() {
    this.store.dispatch(autoLogin());
    this.store.dispatch(getUsersStart());
    this.store.dispatch(getClientsStart());
    this.store.dispatch(getGymsStart());
    this.store.dispatch(getTrainersStart());
    this.store.dispatch(getNutritionistsStart());
    this.store.dispatch(getReviewsStart());
  }
}
