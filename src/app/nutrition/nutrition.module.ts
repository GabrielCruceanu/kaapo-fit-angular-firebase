import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NutritionRoutingModule } from './nutrition-routing.module';
import { NutritionComponent } from './view/nutrition/nutrition.component';

@NgModule({
  imports: [CommonModule, NutritionRoutingModule],
  declarations: [NutritionComponent],
})
export class NutritionModule {}
