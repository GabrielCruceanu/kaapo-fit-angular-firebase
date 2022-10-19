import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GymsComponent } from '@/app/gym/view/gyms/gyms.component';
import { GymComponent } from '@/app/gym/view/gym/gym.component';

const routes: Routes = [
  {
    path: '',
    component: GymsComponent,
  },
  {
    path: ':username',
    component: GymComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GymRoutingModule {}
