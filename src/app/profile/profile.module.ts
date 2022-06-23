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
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxMatIntlTelInputModule } from 'ngx-mat-intl-tel-input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { AddNutritionistProfileComponent } from './view/add-nutritionist-profile/add-nutritionist-profile.component';
import { ClientProfileComponent } from './components/client-profile/client-profile.component';
import { UserProfileSidebarComponent } from './components/user-profile-sidebar/user-profile-sidebar.component';
import { MatDialogModule } from '@angular/material/dialog';
import { ComponentsSharedModule } from '@/app/shared/components/components-shared.module';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AddMeasurementsComponent } from '@/app/profile/view/add-measurements/add-measurements.component';
import { TrainerProfileComponent } from './components/trainer-profile/trainer-profile.component';

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
    ClientProfileComponent,
    UserProfileSidebarComponent,
    AddMeasurementsComponent,
    TrainerProfileComponent,
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
    FormsModule,
    MatAutocompleteModule,
    NgxMatIntlTelInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatMomentDateModule,
    MatDialogModule,
    MatToolbarModule,
    ComponentsSharedModule,
  ],
  providers: [],
})
export class ProfileModule {}
