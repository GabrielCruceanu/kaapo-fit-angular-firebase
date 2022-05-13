import { Component, ViewEncapsulation } from '@angular/core';
import { getUserDataMock } from '../../../../data/userDetails';

import SwiperCore, { EffectFade } from 'swiper';
import { ClientDetails } from '../../model/profile-interface';
import { initializeApp } from '@angular/fire/app';
import { firebaseConfig } from '../../../app.module';
import { collection, getFirestore, query } from '@angular/fire/firestore';
import { collectionData } from 'rxfire/firestore';

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
