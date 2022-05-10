import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WorkoutComponent } from './view/workout/workout.component';
import { WorkoutRoutingModule } from './workout-routing.module';
import { LayoutModule } from "../shared/components/layout/layout.module";

@NgModule({
  declarations: [WorkoutComponent],
  imports: [CommonModule, WorkoutRoutingModule, LayoutModule],
})
export class WorkoutModule {}
