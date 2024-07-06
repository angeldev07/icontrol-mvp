import { Routes } from '@angular/router';
import { HomeComponent } from './home';
import { AppLayoutComponent } from './layout';
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
            },
            {
                path: 'dashboard',
                component: AppLayoutComponent,
                children: [
                    {
                        path: 'administradores',
                        loadChildren: () => import('./admins/admins.routes').then(a => a.ADMIN_ROUTES)
                    },
                    {
                        path: 'propiedades',
                        loadChildren: () => import('./properties/propierties.routes').then(p => p.PROPERTIES_ROUTES)
                    },
                    {
                        path: 'medidores',
                        loadChildren: () => import('./meters/meters.routes').then(m => m.METER_ROUTES)
                    },
                    {
                        path: 'tarifas',
                        loadChildren: () => import('./use-types/usetypes.routes').then(ut => ut.USE_TYPES_ROUTES)
                    },
                    {
                        path: 'recargas',
                        loadChildren: () => import('./vendings/vendings.routes').then(v => v.VENDINGS_ROUTES)
                    },
                    {
                        path: 'contratos',
                        loadChildren: () => import('./contrats/contrats.routes').then(c => c.CONTRACTS_ROUTES)
                    },
                    
                    {
                        path: '**',
                        redirectTo: 'administradores'
                    }
                ]
                
            }
        ]
    }
];
