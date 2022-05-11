import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { getUserDataMock, UserMock } from '../../../../data/user.mock';
import SwiperCore, {
  EffectCoverflow,
  SwiperOptions,
  Virtual,
  Navigation,
  EffectCards,
} from 'swiper';
import { SwiperComponent } from 'swiper/angular';

// install Swiper modules
SwiperCore.use([Virtual, EffectCards, Navigation]);

@Component({
  selector: 'app-user-profile-images',
  templateUrl: './user-profile-images.component.html',
  styleUrls: ['./user-profile-images.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserProfileImagesComponent implements OnInit {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  profile: UserMock;

  config: SwiperOptions = {
    nested: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  constructor() {
    this.profile = getUserDataMock();
  }

  ngOnInit(): void {}
}
