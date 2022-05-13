import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './view/profile/profile.component';
import { AddProfileComponent } from './components/add-profile/add-profile.component';
import { AddClientProfileComponent } from './components/add-client-profile/add-client-profile.component';
import { AddProfessionalProfileComponent } from './components/add-professional-profile/add-professional-profile.component';
import { AddGymProfileComponent } from './components/add-gym-profile/add-gym-profile.component';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'add', component: AddProfileComponent },
  { path: 'add-client', component: AddClientProfileComponent },
  { path: 'add-professional', component: AddProfessionalProfileComponent },
  { path: 'add-gym', component: AddGymProfileComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProfileRoutingModule {}
