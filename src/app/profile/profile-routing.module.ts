import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './view/profile/profile.component';
import { AddProfileComponent } from './view/add-profile/add-profile.component';
import { AddClientProfileComponent } from './view/add-client-profile/add-client-profile.component';
import { AddTrainerProfileComponent } from './view/add-trainer-profile/add-trainer-profile.component';
import { AddGymProfileComponent } from './view/add-gym-profile/add-gym-profile.component';
import { ProfileGuard } from './services/profile-guard.service';

const routes: Routes = [
  { path: '', component: ProfileComponent },
  { path: 'add', component: AddProfileComponent },
  { path: 'client', component: AddClientProfileComponent },
  { path: 'trainer', component: AddTrainerProfileComponent },
  { path: 'gym', component: AddGymProfileComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [ProfileGuard],
})
export class ProfileRoutingModule {}
