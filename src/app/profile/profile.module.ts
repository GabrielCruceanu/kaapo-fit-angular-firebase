import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './view/profile/profile.component';
import {SwiperModule} from "swiper/angular";

@NgModule({
  declarations: [ProfileComponent],
  imports: [CommonModule, ProfileRoutingModule, SwiperModule],
})
export class ProfileModule {}
