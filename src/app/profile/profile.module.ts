import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './view/profile/profile.component';
import { SwiperModule } from 'swiper/angular';
import { LayoutModule } from '../shared/components/layout/layout.module';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProContainerComponent } from './components/pro-container/pro-container.component';
import { UserProfileDetailsComponent } from './components/user-profile-details/user-profile-details.component';
import { UserProfileImagesComponent } from './components/user-profile-images/user-profile-images.component';
import { MatIconModule } from '@angular/material/icon';

@NgModule({
  declarations: [
    ProfileComponent,
    UserProfileComponent,
    ProContainerComponent,
    UserProfileDetailsComponent,
    UserProfileImagesComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SwiperModule,
    LayoutModule,
    MatIconModule,
  ],
})
export class ProfileModule {}
