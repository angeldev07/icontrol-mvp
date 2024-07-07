import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { AdminsService } from '../../../admins/services';
import { Observable } from 'rxjs';
import { SkeletonModule } from 'primeng/skeleton';
import { PropertiesListComponent } from '../../../properties/components';
import { MeterHomeListComponent } from '../../components';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    DropdownModule,
    DividerModule,
    SkeletonModule,
    MeterHomeListComponent
  ],
  template: `
  
  <main class="p-3">
    <section class="bg-white shadow-2 mb-4 border-round">
        <div class="flex align-items-center p-3">
            <div class="pr-3">
              <p class="font-bold">Gestión de Medidores</p>
            </div>
        </div>
    </section>
    
    <section class="bg-white shadow-2">
      <!-- filtros -->
      <div class="p-3">
        <p>Filtros</p>
        <div class="grid">
          <div class="p-fluid col-12 md:col-6">
            <p-iconField iconPosition="left">
              <p-inputIcon styleClass="pi pi-search" />
              <input type="text" pInputText placeholder="Buscar admin" />
            </p-iconField>
          </div>
          <div class="p-fluid col-12 md:col-6">
            <p-dropdown 
              [options]="[{name: 'activo'}]" 
              optionLabel="name" 
              placeholder="Seleccionar estado" />
          </div>
        </div>
      </div>

      <p-divider />

      <div>
        @if (adminList$ | async; as adminList) {
          <app-meter-home-list [meters]="adminList" />
        }
        @else {
          <p-skeleton width="100%" height="50px"  />
        }
        </div>



    </section>
    
  </main>
  
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {

    /**
   * @description Inject the AdminsService
   */
    private adminsServices = inject(AdminsService)

    /**
     * @description Get the list of admins
     */
    public adminList$!: Observable<any>
  

  ngOnInit(): void {
    this.adminList$ = this.adminsServices.getAdminsListFakeData();
   }

}
