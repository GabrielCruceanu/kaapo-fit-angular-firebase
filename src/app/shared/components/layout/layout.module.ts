import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { ComponentsSharedModule } from '../components-shared.module';

@NgModule({
  declarations: [LayoutComponent],
  imports: [CommonModule, ComponentsSharedModule],
  exports: [LayoutComponent],
})
export class LayoutModule {}
