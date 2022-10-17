import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NotFoundPageComponent } from './shared/view/not-found-page/not-found-page.component';
import { AuthGuard } from './auth/services/auth-guard.service';
import { ProfileDetailsComponent } from '@/app/profile/view/profile-details/profile-details.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./landing-page/landing-page.module').then(
        (m) => m.LandingPageModule
      ),
  },
  {
    path: 'profil',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./profile/profile.module').then((m) => m.ProfileModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'progress',
    loadChildren: () =>
      import('./progress/progress.module').then((m) => m.ProgressModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'adauga',
    loadChildren: () =>
      import('./add-information/add-information.module').then(
        (m) => m.AddInformationModule
      ),
    canActivate: [AuthGuard],
  },
  {
    path: 'antrenori',
    loadChildren: () =>
      import('./trainer/trainer.module').then((m) => m.TrainerModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'nutritionisti',
    loadChildren: () =>
      import('./nutrition/nutrition.module').then((m) => m.NutritionModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'sali',
    loadChildren: () => import('./gym/gym.module').then((m) => m.GymModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'autentificare',
    loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule),
  },
  {
    path: ':id',
    component: ProfileDetailsComponent,
  },
  {
    path: '**',
    component: NotFoundPageComponent,
    data: { title: 'Not Found' },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
