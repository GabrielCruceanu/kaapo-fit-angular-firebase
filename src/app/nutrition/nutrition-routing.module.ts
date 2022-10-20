import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NutritionComponent } from './view/nutrition/nutrition.component';
import { NutritionsComponent } from '@/app/nutrition/view/nutritions/nutritions.component';

const routes: Routes = [
  {
    path: '',
    component: NutritionsComponent,
  },
  {
    path: ':username',
    component: NutritionComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NutritionRoutingModule {}
