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
import { AddProfileComponent } from './view/add-profile/add-profile.component';
import { ProfileService } from './services/profile.service';
import { MatStepperModule } from '@angular/material/stepper';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { AddClientProfileComponent } from './view/add-client-profile/add-client-profile.component';
import { AddTrainerProfileComponent } from './view/add-trainer-profile/add-trainer-profile.component';
import { AddGymProfileComponent } from './view/add-gym-profile/add-gym-profile.component';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { GooglePlaceModule } from 'ngx-google-places-autocomplete';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AddNutritionistProfileComponent } from './view/add-nutritionist-profile/add-nutritionist-profile.component';

@NgModule({
  declarations: [
    ProfileComponent,
    UserProfileComponent,
    ProContainerComponent,
    UserProfileDetailsComponent,
    UserProfileImagesComponent,
    AddProfileComponent,
    AddClientProfileComponent,
    AddTrainerProfileComponent,
    AddGymProfileComponent,
    AddNutritionistProfileComponent,
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
    FormsModule,
    MatAutocompleteModule,
    NgxMatIntlTelInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
  ],
  providers: [ProfileService],
})
export class ProfileModule {}
