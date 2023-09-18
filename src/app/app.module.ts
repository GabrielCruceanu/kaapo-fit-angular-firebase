import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '@/environments/environment';
import { MatButtonModule } from '@angular/material/button';
import { MatBadgeModule } from '@angular/material/badge';
import { HomeModule } from './home/home.module';
import { ComponentsSharedModule } from './shared/components/components-shared.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { NotFoundPageComponent } from './shared/view/not-found-page/not-found-page.component';
import { MatCardModule } from '@angular/material/card';
import { AuthModule } from './auth/auth.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AuthEffects } from './auth/store/auth.effects';
import { appReducer } from './store/app.state';
import { AuthTokenInterceptor } from './auth/services/AuthToken.interceptor';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { CustomSerializer } from './store/router/custom-serializer';
import { LayoutModule } from './shared/components/layout/layout.module';
import { ProfileModule } from './profile/profile.module';
import { ProfileEffects } from './profile/store/profile.effects';
import { AuthService } from './auth/services/auth.service';
import { ProfileService } from './profile/services/profile.service';
import { CountryService } from './shared/services/country.service';
import { EnvironmentService } from '@/app/shared/services/environment/environment.service';
import { NgxImageCompressService } from 'ngx-image-compress';
import { SharedEffects } from '@/app/store/shared/shared.effects';

export const firebaseConfig = environment.firebase;

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
    AppRoutingModule,
    MatButtonModule,
    MatBadgeModule,
    ComponentsSharedModule,
    HttpClientModule,
    EffectsModule.forRoot([AuthEffects, SharedEffects, ProfileEffects]),
    StoreModule.forRoot(appReducer),
    StoreDevtoolsModule.instrument({
      logOnly: environment.production,
    }),
    StoreRouterConnectingModule.forRoot({
      serializer: CustomSerializer,
    }),
    MatCardModule,
    AuthModule,
    HomeModule,
    ProfileModule,
    LayoutModule,
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthTokenInterceptor,
      multi: true,
    },
    AuthService,
    ProfileService,
    CountryService,
    EnvironmentService,
    NgxImageCompressService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
