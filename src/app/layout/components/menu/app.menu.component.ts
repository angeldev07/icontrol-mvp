import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from '../../service/app.layout.service';
import { AppMenuitemComponent } from '../../app.menuitem.component';
import { NgFor, NgIf } from '@angular/common';


@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html',
    standalone: true,
    imports: [NgFor, NgIf, AppMenuitemComponent]
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Inicio',
                items: [
                    { label: 'Inicio', icon: 'pi pi-fw pi-home', routerLink: ['/'] }
                ],
                rol: ['Administrador','SuperAdministrador']
            },
            {
                label: 'Administración',
                icon: 'pi pi-fw pi-users',
                items: [
                    {
                        label: 'Administradores',
                        icon: 'pi pi-fw pi-user',
                        routerLink: ['./administradores'],
                        roles: ['SuperAdministrador']
                    },
                    {
                        label: 'Propiedades',
                        icon: 'pi pi-fw pi-building',
                        routerLink: ['./propiedades'],
                        roles: ['Administrador', 'SuperAdministrador']
                    },
                    {
                        label: 'Medidores',
                        icon: 'pi pi-fw pi-calculator',
                        routerLink: ['./medidores'],
                        roles: ['Administrador', 'SuperAdministrador']
                    },
                    {
                        label: 'Tarifas',
                        icon: 'pi pi-fw pi-dollar',
                        routerLink: ['./tarifas'],
                        roles: ['Administrador', 'SuperAdministrador']
                    },
                    {
                        label: 'Historial de recargas',
                        icon: 'pi pi-fw pi-receipt',
                        routerLink: ['./recargas'],
                        roles: ['Administrador', 'SuperAdministrador']
                    },
                ],
            },
        ];
    }
}
