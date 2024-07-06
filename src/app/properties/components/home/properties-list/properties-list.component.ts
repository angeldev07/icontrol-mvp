import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-properties-list',
  standalone: true,
  imports: [
    CommonModule,
    TableModule,
    ButtonModule
  ],
  template: `
  
  <p-table 
    [value]="properties" 
    responsiveLayout="scroll"
    [paginator]="true"
    [rows]="10"
    [rowsPerPageOptions]="[5, 10, 20]"
    [showCurrentPageReport]="true"
    currentPageReportTemplate="Mostrando {first} a {last} de {totalRecords} entradas"
    rowGroupMode="subheader" 
    groupRowsBy="name" 
    >

    <ng-template pTemplate="header">
      <tr>
        <th class="text-center">Dirección</th>
        <th class="text-center">Alojamiento</th>
        <th class="text-center">Departamento</th>
        <th class="text-center">Acciones</th>
      </tr>
    </ng-template>

    <ng-template pTemplate="groupheader" let-customer let-rowIndex="rowIndex" let-expanded="expanded">
      <tr>
          <td colspan="4">
              <button 
                  type="button" 
                  pButton 
                  pRipple 
                  [pRowToggler]="customer" 
                  class="p-button-text p-button-rounded p-button-plain mr-2" 
                  [icon]="expanded ? 'pi pi-chevron-down' : 'pi pi-chevron-right'">
              </button>
              <img 
                  src="https://robohash.org/{{customer.name}}"
                  width="32" 
                  style="vertical-align: middle" />
              <span class="font-bold ml-2">{{customer.name}}</span>
          </td>
      </tr>
      </ng-template>

      <ng-template pTemplate="rowexpansion" let-customer>
        <tr>
            <td class="text-center p-0">
                {{customer.address.street}}
            </td>
            <td class="text-center p-0">
                {{customer.address.suite}}
            </td>
            <td class="text-center p-0">
                {{customer.address.city}}
            </td>
            <td class="text-center p-0">
                <button 
                    type="button" 
                    pButton 
                    pRipple 
                    icon="pi pi-pencil" 
                    class="p-button-rounded p-button-text p-button-plain mr-2">
                </button>
                <button 
                    type="button" 
                    pButton 
                    pRipple 
                    icon="pi pi-trash" 
                    class="p-button-rounded p-button-text p-button-plain">
                </button>
            </td>
        </tr>
        </ng-template>


  </p-table>
  
  
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PropertiesListComponent implements OnInit {

  @Input() properties: any[] = [];

  ngOnInit(): void { }

}
