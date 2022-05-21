import { Component, Input, OnInit } from '@angular/core';
import { getUserDataMock } from '../../../../data/userDetails';
import { ClientDetails, UserType } from '../../model/profile-interface';
import { ClientProfile } from '../../model/clientProfile.model';
import { GymProfile } from '../../model/gym.model';
import { TrainerProfile } from '../../model/trainerProfile.model';
import { NutritionistProfile } from '../../model/nutritionistProfile.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { getClientProfile } from '../../store/profile.selector';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  clientProfileDetails$: Observable<ClientProfile | null> | undefined;
  userType = UserType;

  sampleImgLink =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.clientProfileDetails$ = this.store.select(getClientProfile);
  }
}
