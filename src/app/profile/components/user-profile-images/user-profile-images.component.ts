import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import SwiperCore, {
  EffectCards,
  Navigation,
  SwiperOptions,
  Virtual,
} from 'swiper';
import { SwiperComponent } from 'swiper/angular';
import { ClientPhysicalDetails } from '../../model/clientProfile.model';

// install Swiper modules
SwiperCore.use([Virtual, EffectCards, Navigation]);

@Component({
  selector: 'app-user-profile-images',
  templateUrl: './user-profile-images.component.html',
  styleUrls: ['./user-profile-images.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserProfileImagesComponent {
  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;
  @Input()
  clientPhysicalDetails: ClientPhysicalDetails | null;

  config: SwiperOptions = {
    nested: true,
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };
}
