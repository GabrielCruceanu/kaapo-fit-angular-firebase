import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { LoginComponent } from './view/login/login.component';
import { SignUpComponent } from './view/sign-up/sign-up.component';
import { ComponentsSharedModule } from '../core/components/components-shared.module';
import { AuthContainerComponent } from './components/auth-container/auth-container.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LogoutConfirmationDialogComponent } from './components/logout-confirmation-dialog/logout-confirmation-dialog.component';
import { MatDialogModule } from '@angular/material/dialog';
import { StoreModule } from '@ngrx/store';
import { reducers } from './reducers';
import { AuthEffects } from './effects/auth.effects';
import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    AuthContainerComponent,
    LoginComponent,
    SignUpComponent,
    LogoutConfirmationDialogComponent,
  ],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ComponentsSharedModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    ReactiveFormsModule,
    MatDialogModule,
    StoreModule.forFeature('auth', reducers),
    EffectsModule.forFeature([AuthEffects]),
  ],
})
export class AuthModule {}
