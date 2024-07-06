import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from "primeng/dropdown";
import { AdminsService } from '../../services';
import { Observable } from 'rxjs';
import { SkeletonModule } from "primeng/skeleton";
import { DividerModule } from 'primeng/divider';
import { AdminListComponent } from '../../components';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';



@Component({
  selector: 'app-home',
  standalone: true,
  providers: [ConfirmationService, MessageService],
  imports: [
    CommonModule,
    ButtonModule,
    IconFieldModule,
    InputIconModule,
    InputTextModule,
    DropdownModule,
    SkeletonModule,
    DividerModule,
    ConfirmDialogModule,
    ToastModule,
    AdminListComponent
  ],
  template: `
  
    <main class="p-3">
      <section class="bg-white shadow-2 mb-4 border-round">
          <div class="flex align-items-center p-3">
              <div class="pr-3">
                <p class="font-bold">Gestión de Administradores/Propietarios</p>
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
          <!-- table -->
          <div>
              @if (adminList$ | async; as adminList) {
                <app-admin-list [admins]="adminList" (onDelete)="onDeleteConfirm($event)" />
              }
              @else {
                <p-skeleton width="100%" height="50px"  />
              }
          </div>


      </section>
    </main>
    
    <p-toast />
    <p-confirmDialog />
  
  
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

  /**
   * @description Inject the ConfirmationService
   */
  private confirmationService = inject(ConfirmationService)

  /**
   * @description Inject the MessageService
   */
  private messageService = inject(MessageService)

  onDeleteConfirm(event: any) {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      acceptButtonStyleClass:"p-button-danger p-button-text",
      rejectButtonStyleClass:"p-button-text p-button-text",
      acceptIcon:"none",
      rejectIcon:"none",

      accept: () => {
          this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: 'Record deleted' });
      },
      reject: () => {
          this.messageService.add({ severity: 'error', summary: 'Rejected', detail: 'You have rejected' });
      }
  });
  }

  ngOnInit(): void { 
    this.adminList$ = this.adminsServices.getAdminsListFakeData()
  }


}
