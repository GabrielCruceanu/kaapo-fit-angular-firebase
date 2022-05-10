import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './view/profile/profile.component';
import {SwiperModule} from "swiper/angular";
import { LayoutModule } from "../shared/components/layout/layout.module";

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, ProfileRoutingModule, SwiperModule, LayoutModule],
})
export class ProfileModule {}
