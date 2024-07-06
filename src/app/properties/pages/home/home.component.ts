import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { DividerModule } from 'primeng/divider';
import { DropdownModule } from 'primeng/dropdown';
import { PropertiesListComponent } from '../../components';
import { AdminsService } from '../../../admins/services';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    DividerModule,
    DropdownModule,
    PropertiesListComponent

  ],
  template: `
  
  <main class="p-3">
    <section class="bg-white shadow-2 mb-4 border-round">
        <div class="flex align-items-center p-3">
            <div class="pr-3">
              <p class="font-bold">Gestión de Propiedades</p>
            </div>
        </div>
    </section>

    <section class="bg-white shadow-2">
        <!-- filtros -->
          <div class="pt-3 px-3 pb-0">
            <p>Filtros</p>
            <div class="grid">
              <div class="p-fluid col-12 md:col-6  ml-auto">
                <p-dropdown 
                  [options]="adminList$ | async" 
                  optionLabel="name" 
                  placeholder="Seleccionar Administrador" />
              </div>
            </div>
          </div>
          <p-divider />

          <div>
            <app-properties-list  [properties]="adminList$ | async" />
          </div>

    </section>
  </main>
  
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {

  private adminService = inject(AdminsService)

  adminList$: Observable<any> = this.adminService.getAdminsListFakeData();

  ngOnInit(): void { }

}
