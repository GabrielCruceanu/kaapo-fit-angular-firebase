import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GymComponent } from './view/gym/gym.component';
import { GymsComponent } from './view/gyms/gyms.component';
import { LayoutModule } from '@/app/shared/components/layout/layout.module';
import { ComponentsSharedModule } from '@/app/shared/components/components-shared.module';
import { GymRoutingModule } from '@/app/gym/gym-routing.module';

@NgModule({
  declarations: [GymComponent, GymsComponent],
  imports: [
    CommonModule,
    GymRoutingModule,
    LayoutModule,
    ComponentsSharedModule,
  ],
})
export class GymModule {}
