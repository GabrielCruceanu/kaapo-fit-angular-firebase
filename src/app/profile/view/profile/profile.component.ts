import { Component, ViewEncapsulation } from '@angular/core';
import { getUserDataMock, UserMock } from '../../../../data/user.mock';

import SwiperCore, { EffectFade, Swiper } from 'swiper';

SwiperCore.use([EffectFade]);

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent {
  public title: string = 'My Profile';
  public profile: UserMock;

  constructor() {
    this.profile = getUserDataMock();
  }
}
