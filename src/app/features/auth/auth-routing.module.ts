import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './view/login/login.component';
import { SignUpComponent } from './view/sign-up/sign-up.component';
import { NgModule } from '@angular/core';
import { ResetPasswordComponent } from './view/reset-password/reset-password.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', redirectTo: 'cont', pathMatch: 'full' },
      { path: 'cont', component: LoginComponent },
      { path: 'inregistrare', component: SignUpComponent },
      { path: 'resetare-parola', component: ResetPasswordComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
