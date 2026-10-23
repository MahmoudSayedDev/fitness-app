import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth/auth.guard';

export const ContentRoutes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () => import('../../features/home/home.component').then((C) => C.HomeComponent),
  },
  {
    path: 'about',
    loadComponent: () =>
      import('../../features/about-us/about-us.component').then((C) => C.AboutUsComponent),
  },
  {
    path: 'classes',
    loadComponent: () =>
      import('../../features/classes/classes.component').then((C) => C.ClassesComponent),
  },
  {
    path: 'classes/:id',
    loadComponent: () =>
      import('../../features/classes/pages/exercises/exercises.component').then(
        (C) => C.ExercisesComponent,
      ),
  },
  {
    path: 'healthy',
    loadComponent: () =>
      import('../../features/healthy/healthy.component').then((C) => C.HealthyComponent),
  },
  {
    path: 'healthy/:id',
    loadComponent: () =>
      import('../../features/healthy/pages/healthy-details/healthy-details.component').then(
        (C) => C.HealthyDetailsComponent,
      ),
  },
  {
    path: 'account-settings',
    loadComponent: () =>
      import('../../features/account-settings/account-settings.component').then(
        (C) => C.AccountSettingsComponent,
      ),
    canActivate: [authGuard],
  },
];
