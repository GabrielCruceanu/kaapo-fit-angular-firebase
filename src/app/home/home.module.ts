import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './view/home.component';
import {ComponentsSharedModule} from "../shared/components/components-shared.module";

@NgModule({
  declarations: [HomeComponent],
    imports: [CommonModule, HomeRoutingModule, ComponentsSharedModule],
})
export class HomeModule {}
