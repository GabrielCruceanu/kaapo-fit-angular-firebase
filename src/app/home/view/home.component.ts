import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { autoLogout } from '../../auth/store/auth.actions';
import { getUserAuth } from '../../auth/store/auth.selector';
import { UserAuth } from '../../auth/model/userAuth.model';
import { Observable, of } from 'rxjs';
import { ClientProfile } from '@/app/profile/model/clientProfile.model';
import {
  getClients,
  getGyms,
  getNutritionists,
  getTrainers,
} from '@/app/store/shared/shared.selector';
import { GymProfile } from '@/app/profile/model/gym.model';
import { TrainerProfile } from '@/app/profile/model/trainerProfile.model';
import { NutritionistProfile } from '@/app/profile/model/nutritionistProfile.model';
import { UserType } from '@/app/profile/model/profile-interface';
import { getUserProfile } from '@/app/profile/store/profile.selector';
import { UserProfile } from '@/app/profile/model/userProfile.model';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userType = UserType;
  userAuth$: Observable<UserAuth | null>;
  userProfile$: Observable<UserProfile | null>;
  clients$: Observable<ClientProfile[] | []>;
  gyms$: Observable<GymProfile[] | []>;
  trainers$: Observable<TrainerProfile[] | []>;
  nutritionists$: Observable<NutritionistProfile[] | []>;

  constructor(private store: Store) {
    this.userAuth$ = of(null);
  }

  ngOnInit() {
    this.userAuth$ = this.store.select(getUserAuth);
    this.userProfile$ = this.store.select(getUserProfile);
    this.clients$ = this.store.select(getClients);
    this.gyms$ = this.store.select(getGyms);
    this.trainers$ = this.store.select(getTrainers);
    this.nutritionists$ = this.store.select(getNutritionists);
  }

  logout(event: Event) {
    event.preventDefault();
    this.store.dispatch(autoLogout());
  }
}
