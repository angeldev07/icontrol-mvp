import { Routes } from '@angular/router';
import { HomeComponent } from './home';

export const routes: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: 'admin',
        children: [
            {
                path: 'login',
                loadChildren: () => import('./auth/auth.routes').then(a => a.AUTH_ROUTES)
            }
        ]
    }
];
