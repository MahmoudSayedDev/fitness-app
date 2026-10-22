import { Routes } from '@angular/router';

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
    path: 'exercises/:id',
    loadComponent: () =>
      import('../../features/classes/pages/exercises/exercises.component').then(
        (C) => C.ExercisesComponent,
      ),
  },
];
