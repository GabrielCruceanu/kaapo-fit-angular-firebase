import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {WorkoutComponent} from "./view/workout/workout.component";

const routes: Routes = [{
  path: '',
  component: WorkoutComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})

export class WorkoutRoutingModule {}
