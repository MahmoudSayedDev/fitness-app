import { Routes } from '@angular/router';
import { ContentComponent } from './shared/layout/content/content.component';

export const routes: Routes = [


    // main App
    {
        path: '',
        component: ContentComponent,
        loadChildren: () => import('./shared/routes/content.routes').then((R) => R.ContentRoutes)
    },


    {
        path: 'auth',
        loadChildren: () => import('./features/auth/auth.routes').then((R) => R.AuthRoutes)
    },
];
