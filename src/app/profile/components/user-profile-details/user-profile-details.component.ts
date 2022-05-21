import { Component, Input, OnInit } from '@angular/core';
import { getUserDataMock } from '../../../../data/userDetails';
import { ClientDetails, UserType } from '../../model/profile-interface';
import {
  ClientPhysicalDetails,
  ClientProfile,
} from '../../model/clientProfile.model';
import { GymProfile } from '../../model/gym.model';
import { TrainerProfile } from '../../model/trainerProfile.model';
import { NutritionistProfile } from '../../model/nutritionistProfile.model';
import { Observable } from 'rxjs';
import { getClientProfile } from '../../store/profile.selector';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';

@Component({
  selector: 'app-user-profile-details',
  templateUrl: './user-profile-details.component.html',
  styleUrls: ['./user-profile-details.component.scss'],
})
export class UserProfileDetailsComponent implements OnInit {
  clientProfileDetails$: Observable<ClientProfile | null> | undefined;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.clientProfileDetails$ = this.store.select(getClientProfile);
  }
}
