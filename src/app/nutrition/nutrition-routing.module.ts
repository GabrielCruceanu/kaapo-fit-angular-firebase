import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NutritionComponent } from './view/nutrition/nutrition.component';

const routes: Routes = [
  {
    path: '',
    component: NutritionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NutritionRoutingModule {}
