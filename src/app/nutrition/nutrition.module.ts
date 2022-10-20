import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { NutritionRoutingModule } from './nutrition-routing.module';
import { NutritionComponent } from './view/nutrition/nutrition.component';
import { LayoutModule } from '../shared/components/layout/layout.module';
import { NutritionsComponent } from './view/nutritions/nutritions.component';
import { ComponentsSharedModule } from '@/app/shared/components/components-shared.module';
import { ProfileModule } from '@/app/profile/profile.module';

@NgModule({
  imports: [
    CommonModule,
    NutritionRoutingModule,
    LayoutModule,
    ComponentsSharedModule,
    ProfileModule,
  ],
  declarations: [NutritionComponent, NutritionsComponent],
})
export class NutritionModule {}
