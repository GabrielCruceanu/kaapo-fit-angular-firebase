import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { ComponentsSharedModule } from '../components-shared.module';
import { MatBadgeModule } from '@angular/material/badge';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, ComponentsSharedModule, MatBadgeModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}
