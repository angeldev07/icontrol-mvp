import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-vendings-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
  ],
  template: `
    <p-table
      [value]="[{}]"
      [paginator]="true"
      [rows]="10"
      [rowsPerPageOptions]="[5, 10, 20]"
    >
      <ng-template pTemplate="caption">
        <div class="flex align-items-center">
          <div>
            <p>Historial de ventas</p>
          </div>
          <p-iconField iconPosition="left" class="ml-auto">
            <p-inputIcon>
              <i class="pi pi-search"></i>
            </p-inputIcon>
            <input pInputText type="text" placeholder="Buscar venta" />
          </p-iconField>
        </div>
      </ng-template>

      <ng-template pTemplate="header">
        <tr>
          <th class="text-center">Alojamiento</th>
          <th class="text-center">Medidor</th>
          <th class="text-center">Cantidad recargada</th>
          <th class="text-center">Total</th>
          <th class="text-center">Fecha</th>
        </tr>
      </ng-template>

      <ng-template pTemplate="body" let-meter>
        <tr>
          <td class="text-center">Av4 # an 50 Guaimaral</td>
          <td class="text-center">12334556</td>
          <td class="text-center">2 noches</td>
          <td class="text-center">$1000</td>
          <td class="text-center">06/07/2024</td>
        </tr>
      </ng-template>
    </p-table>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VendingsListComponent implements OnInit {
  ngOnInit(): void {}
}
