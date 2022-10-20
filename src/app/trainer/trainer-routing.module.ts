import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TrainerComponent } from '@/app/trainer/view/trainer/trainer.component';
import { TrainersComponent } from '@/app/trainer/view/trainers/trainers.component';

const routes: Routes = [
  { path: '', component: TrainersComponent },
  { path: ':username', component: TrainerComponent },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrainerRoutingModule {}
