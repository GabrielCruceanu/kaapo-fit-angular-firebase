import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressRoutingModule } from './progress-routing.module';
import { ProgressComponent } from './view/progress/progress.component';

NgModule({
  imports: [CommonModule, ProgressRoutingModule],
  declarations: [ProgressComponent],
});

export class ProgressModule {}
