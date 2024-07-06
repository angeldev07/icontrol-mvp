import { Routes } from "@angular/router";
import { AdminDetailsComponent, HomeComponent } from "./pages";


export const ADMIN_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: ':id',
        component: AdminDetailsComponent
    }
]