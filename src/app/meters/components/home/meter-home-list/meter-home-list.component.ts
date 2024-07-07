import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  Input,
  type OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-meter-home-list',
  standalone: true,
  imports: [CommonModule, TableModule, ButtonModule, RouterLink],
  template: `
    <p-table
      [value]="meters"
      responsiveLayout="scroll"
      [paginator]="true"
      [rows]="10"
      [rowsPerPageOptions]="[5, 10, 20]"
      [showCurrentPageReport]="true"
      currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} entradas"
      rowGroupMode="subheader"
      groupRowsBy="name"
      [globalFilterFields]="['name']"
      #dt
    >
      <ng-template pTemplate="header">
        <tr>
          <th class="text-center">Codigo</th>
          <th class="text-center">Alojamiento</th>
          <th class="text-center">Tarifa</th>
          <th class="text-center">Registro</th>
          <th class="text-center">Tipo</th>
          <th class="text-center">Acciones</th>
        </tr>
      </ng-template>

      <ng-template
        pTemplate="groupheader"
        let-customer
        let-rowIndex="rowIndex"
        let-expanded="expanded"
      >
        <tr>
          <td colspan="6">
            <button
              type="button"
              pButton
              pRipple
              [pRowToggler]="customer"
              class="p-button-text p-button-rounded p-button-plain mr-2"
              [icon]="expanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"
            ></button>
            <img
              src="https://robohash.org/{{ customer.name }}"
              width="32"
              style="vertical-align: middle"
            />
            <span class="font-bold ml-2">{{ customer.name }}</span>
          </td>
        </tr>
      </ng-template>

      <ng-template pTemplate="rowexpansion" let-customer>
        <tr>
          <td class="text-center p-2">
            0022000035885
          </td>
          <td class="text-center p-2">
            {{ customer.address.suite }} - {{ customer.address.city }}
          </td>
          <td class="text-center p-2">
            $ 10.000 por noche
          </td>
          <td class="text-center p-2">
            2023/5/27 21:58:06
          </td>
          <td class="text-center p-2">
            <i class="pi pi-bolt"></i>
            Energetico
          </td>
          <td class="text-center p-2">
            <a
              [routerLink]="['./', customer.id]"
              pButton
              pRipple
              icon="pi pi-eye"
              class="p-button-rounded p-button-text p-button-plain mr-2"
            ></a>
            <button
              type="button"
              pButton
              pRipple
              icon="pi pi-trash"
              class="p-button-rounded p-button-text p-button-plain"
            ></button>
          </td>
        </tr>
      </ng-template>
    </p-table>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeterHomeListComponent implements OnInit {
  @Input() meters: any[] = [];

  ngOnInit(): void {}
}
