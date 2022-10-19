import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TrainerComponent } from './view/trainer/trainer.component';
import { TrainersComponent } from './view/trainers/trainers.component';
import { TrainerRoutingModule } from '@/app/trainer/trainer-routing.module';
import { LayoutModule } from '@/app/shared/components/layout/layout.module';
import { ComponentsSharedModule } from '@/app/shared/components/components-shared.module';
import { ProfileModule } from '@/app/profile/profile.module';

@NgModule({
  declarations: [TrainerComponent, TrainersComponent],
  imports: [
    CommonModule,
    TrainerRoutingModule,
    LayoutModule,
    ComponentsSharedModule,
    ProfileModule,
  ],
})
export class TrainerModule {}
