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
import { AddProfileComponent } from './components/add-profile/add-profile.component';
import { ProfileService } from './profile.service';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AddClientProfileComponent } from './components/add-client-profile/add-client-profile.component';
import { AddProfessionalProfileComponent } from './components/add-professional-profile/add-professional-profile.component';
import { AddGymProfileComponent } from './components/add-gym-profile/add-gym-profile.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatGoogleMapsAutocompleteModule } from '@angular-material-extensions/google-maps-autocomplete';

@NgModule({
  declarations: [
    ProfileComponent,
    UserProfileComponent,
    ProContainerComponent,
    UserProfileDetailsComponent,
    UserProfileImagesComponent,
    AddProfileComponent,
    AddClientProfileComponent,
    AddProfessionalProfileComponent,
    AddGymProfileComponent,
  ],
  imports: [
    CommonModule,
    ProfileRoutingModule,
    SwiperModule,
    LayoutModule,
    MatIconModule,
    MatStepperModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatProgressBarModule,
    MatSelectModule,
    GooglePlaceModule,
    GoogleMapsModule,
    FormsModule,
    MatGoogleMapsAutocompleteModule,
  ],
  providers: [ProfileService],
})
export class ProfileModule {}
