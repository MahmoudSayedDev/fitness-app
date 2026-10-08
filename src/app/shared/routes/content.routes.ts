import { Routes } from '@angular/router';

export const ContentRoutes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('../../features/home/home.component').then((C) => C.HomeComponent)
    }
];
