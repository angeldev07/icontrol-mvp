import { Routes } from "@angular/router";
import { HomeComponent, MeterDetailsComponent } from "./pages";

export const METER_ROUTES: Routes = [
    {
        path: '',
        component: HomeComponent
    },
    {
        path: ':id',
        component: MeterDetailsComponent
    }
]