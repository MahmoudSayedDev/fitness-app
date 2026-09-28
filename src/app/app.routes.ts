import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', redirectTo: 'auth', pathMatch: 'full'
    },
    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then((R) => R.AuthRoutes)
    },
    {
        path: 'home',
        loadComponent: () => import('./features/home/home.component').then((C) => C.HomeComponent)
    }
];
