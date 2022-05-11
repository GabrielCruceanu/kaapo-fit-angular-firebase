import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProgressRoutingModule } from './progress-routing.module';
import { ProgressComponent } from './view/progress/progress.component';
import { LayoutModule } from "../shared/components/layout/layout.module";

@NgModule({
  imports: [CommonModule, ProgressRoutingModule, LayoutModule],
  declarations: [ProgressComponent],
})
export class ProgressModule {}
