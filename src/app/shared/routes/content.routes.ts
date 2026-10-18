import { Routes } from '@angular/router';
import { authGuard } from '../../core/guards/auth/auth.guard';

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
        path: 'account-settings',
        loadComponent: () => import('../../features/account-settings/account-settings.component').then((C) => C.AccountSettingsComponent),
        canActivate: [authGuard]
    }
];
