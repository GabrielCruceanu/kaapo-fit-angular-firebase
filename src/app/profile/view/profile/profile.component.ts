import {Component, ViewEncapsulation} from '@angular/core';
import {getUserDataMock, UserDetails} from "../../../../data/user.details";

import SwiperCore, {EffectFade, Swiper} from 'swiper';

SwiperCore.use([EffectFade]);

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class ProfileComponent {
  title: string = 'My Profile';
  profile: UserDetails

  constructor() {
    this.profile = getUserDataMock()
  }
}
