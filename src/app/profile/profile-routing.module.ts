import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './view/profile/profile.component';
import { AddProfileComponent } from './view/add-profile/add-profile.component';
import { AddClientProfileComponent } from './view/add-client-profile/add-client-profile.component';
import { AddTrainerProfileComponent } from './view/add-trainer-profile/add-trainer-profile.component';
import { AddGymProfileComponent } from './view/add-gym-profile/add-gym-profile.component';
import { AddNutritionistProfileComponent } from './view/add-nutritionist-profile/add-nutritionist-profile.component';
import { ProfileGuard } from './services/profile-guard.service';
import { AddMeasurementsComponent } from '@/app/profile/view/add-measurements/add-measurements.component';

const routes: Routes = [
  { path: '', component: ProfileComponent, canActivate: [ProfileGuard] },
  { path: 'selectare-profil', component: AddProfileComponent },
  { path: 'adaugare-masuratori', component: AddMeasurementsComponent },
  { path: 'client', component: AddClientProfileComponent },
  { path: 'antrenor', component: AddTrainerProfileComponent },
  { path: 'nutritionist', component: AddNutritionistProfileComponent },
  { path: 'sala', component: AddGymProfileComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProfileGuard],
})
export class ProfileRoutingModule {}
