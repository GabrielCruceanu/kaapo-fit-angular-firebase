import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './view/home.component';
import { StoreModule } from '@ngrx/store';
import { reducers } from '../auth/reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from '../auth/effects/auth.effects';

@NgModule({
  declarations: [HomeComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class HomeModule {}
