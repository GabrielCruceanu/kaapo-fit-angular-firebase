import { Component, ViewEncapsulation } from '@angular/core';
import { getUserDataMock } from '../../../../data/userDetails';

import SwiperCore, { EffectFade } from 'swiper';
import { ClientDetails } from '../../model/profile-interface';
SwiperCore.use([EffectFade]);

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent {
  public title: string = 'My Profile';
  public profile: ClientDetails;

  constructor() {
    this.profile = getUserDataMock();
  }
}
