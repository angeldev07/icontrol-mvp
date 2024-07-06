import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, type OnInit, } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AvatarModule } from 'primeng/avatar';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-admin-list',
  standalone: true,
  imports: [
    CommonModule, 
    TableModule, 
    ButtonModule,
    AvatarModule,
    RouterLink
  ],
  template: `
    <p-table
      [value]="admins"
      styleClass="p-datatable-striped"
      responsiveLayout="scroll"
      [paginator]="true"
      [rows]="10"
      [rowsPerPageOptions]="[5, 10, 20]"
      [showCurrentPageReport]="true"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} entradas"
    >
      <ng-template pTemplate="header">
        <tr>
          <th >Admin</th>
          <th class="text-center">Rol</th>
          <th class="text-center">Contrato</th>
          <th class="text-center">Acciones</th>
        </tr>
      </ng-template>
      <ng-template pTemplate="body" let-admin>
        <tr>
          <td class="">
            <div class="flex align-items-center md:pl-4">
              <p-avatar
                image="https://primefaces.org/cdn/primeng/images/demo/avatar/asiyajavayant.png"
                styleClass="mr-2"
                size="large"
                shape="circle"
              />

              <div class="flex flex-column mb-2 text-left">
                <span class="font-bold text-md">{{ admin.name }}</span>
                <span>{{ admin.email }}</span>
              </div>
            </div>
          </td>
          <td class="text-center">
            <span
              class="flex align-items-center gap-2 text-center justify-content-center"
            >
              <i class="pi pi-crown text-yellow-500"></i>
              Administrador
            </span>
          </td>
          <td class="text-center">
            <span
              class="inline-block py-2 px-4 border-round text-green-500 font-bold bg-green-100"
            >
              Activo
            </span>
          </td>
          <td class="text-center">
            <p-button
              icon="pi pi-trash"
              [rounded]="true"
              [text]="true"
              severity="secondary"
              (onClick)="onDelete.emit(admin.id)"
            />
            <a 
              pButton
              [rounded]="true"
              icon="pi pi-eye"
              [text]="true"
              severity="secondary"
              routerLink="./{{ admin.id }}" >
            </a>
            <p-button
              icon="pi pi-pencil"
              [rounded]="true"
              [text]="true"
              severity="secondary"
            />
          </td>
        </tr>
      </ng-template>
    </p-table>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminListComponent implements OnInit {
  
  /**
   * @description Listado de administradores
   */
  @Input() admins = [];

  /**
   * @description Evento para eliminar un administrador
   */
  @Output() onDelete = new EventEmitter();

  ngOnInit(): void {}
}
