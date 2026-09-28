import { Routes } from '@angular/router';

export const AuthRoutes: Routes = [
    {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full'
    },
    {
        path: '',
        loadComponent: () => import('./auth.component').then((C) => C.AuthComponent),
        children: [
            {
                path: 'login',
                loadComponent: () => import('./login/login.component').then((C) => C.LoginComponent),
            },
            {
                path: 'register',
                loadComponent: () => import('./register/register.component').then((C) => C.RegisterComponent),
            }
        ]
    }
];
