import { Component, Input, OnInit } from '@angular/core';
import { getUserDataMock } from '../../../../data/userDetails';
import { ClientDetails } from '../../model/profile-interface';
import { ClientProfile } from '../../model/clientProfile.model';
import { GymProfile } from '../../model/gym.model';
import { TrainerProfile } from '../../model/trainerProfile.model';
import { NutritionistProfile } from '../../model/nutritionistProfile.model';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @Input()
  public profile: ClientDetails;
  sampleImgLink =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
  constructor() {
    this.profile = getUserDataMock();
  }

  ngOnInit(): void {}
}
