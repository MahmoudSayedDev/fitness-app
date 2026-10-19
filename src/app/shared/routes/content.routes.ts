import { Routes } from '@angular/router';

export const ContentRoutes: Routes = [
    {
        path: '', redirectTo: 'home', pathMatch: 'full'
    },
    {
        path: 'home',
        loadComponent: () => import('../../features/home/home.component').then((C) => C.HomeComponent)
    },
    {
        path: 'about',
        loadComponent: () => import('../../features/about-us/about-us.component').then((C) => C.AboutUsComponent)
    },
    {
        path: 'healthy',
        loadComponent: () => import('../../features/healthy/healthy.component').then((C) => C.HealthyComponent)
    },
    {
        path: 'healthy/:id',
        loadComponent: () => import('../../features/healthy/pages/healthy-details/healthy-details.component').then((C) => C.HealthyDetailsComponent)
    }
];
