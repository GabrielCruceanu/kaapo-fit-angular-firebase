import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NutritionRoutingModule } from './nutrition-routing.module';
import { NutritionComponent } from './view/nutrition/nutrition.component';
import { LayoutModule } from "../shared/components/layout/layout.module";

@NgModule({
  imports: [CommonModule, NutritionRoutingModule, LayoutModule],
  declarations: [NutritionComponent],
})
export class NutritionModule {}
