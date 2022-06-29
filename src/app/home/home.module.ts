import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './view/home.component';
import { ComponentsSharedModule } from '../shared/components/components-shared.module';
import { LayoutModule } from '../shared/components/layout/layout.module';
import { MatButtonModule } from '@angular/material/button';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    ComponentsSharedModule,
    LayoutModule,
    MatButtonModule,
  ],
})
export class HomeModule {}
