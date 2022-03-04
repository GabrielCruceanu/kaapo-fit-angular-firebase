import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { HomeModule } from './home/home.module';
import { ComponentsSharedModule } from './core/components/components-shared.module';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NotFoundPageComponent } from './core/view/not-found-page/not-found-page.component';
import { MatCardModule } from '@angular/material/card';
import {AuthModule} from "./auth/auth.module";

export const firebaseConfig = environment.firebaseConfig;

@NgModule({
  declarations: [AppComponent, NotFoundPageComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatSliderModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production, // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideAuth(() => {
      return getAuth();
    }),
    AuthModule,
    MatButtonModule,
    MatBadgeModule,
    ComponentsSharedModule,
    HomeModule,
    StoreModule.forRoot({}, {}),
    EffectsModule.forRoot([]),
    MatCardModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
