import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  inject,
  Input,
  type OnInit,
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { SkeletonModule } from 'primeng/skeleton';
import { AdminInfoComponent, VendingsListComponent } from '../../../admins/components';
import { AdminsService } from '../../../admins/services';
import { Observable, of, tap } from 'rxjs';

@Component({
  selector: 'app-meter-details',
  standalone: true,
  imports: [
    CommonModule,
    SkeletonModule,
    AdminInfoComponent,
    VendingsListComponent,
    RouterLink,
  ],
  template: `
    <main class="p-3">
      <section class="">
        <div class="bg-white p-3 shadow-3  mb-4 flex align-items-center gap-4">
          <a [routerLink]="['../']">
            <i class="pi pi-arrow-left cursor-pointer"></i>
          </a>
          <div>
            <p class="m-0 uppercase font-bold">
              Datos registrados del medidor
            </p>
            <span>Información detallada</span>
          </div>
        </div>

        <!-- datos -->
        @if(admin$ | async; as admin){

        <div class="grid">
          <div class="col-12 md:col-4">
            <!-- info del cliente -->
            <div class="bg-white p-3 shadow-3 mb-4">
              <app-admin-info [admin]="admin" />
            </div>
            <!-- Alojamiento -->
            <div class="bg-white p-3 shadow-3 mb-4">
              #Av7 - 123 Gran Colombia <br>
              20 kw por noche <br>
              $ 10.000 COP por recarga <br>

            </div>
            <!-- QR -->
            <div class="bg-white p-3 shadow-3">
              <img src="assets/qr.webp" alt="qr" class="w-full h-full">
            </div>
          </div>

          <div class="col-12 md:col-8">
            <!-- vendings -->
            <div class="bg-white p-1">
              <app-vendings-list />
            </div>
          </div>
        </div>

        } @else {

        <div class="grid">
          <div class="col-12 md:col-4">
            <!-- info -->
            <div class="bg-white p-3 shadow-3 mb-4">
              <p-skeleton width="100%" height="100px" />
            </div>
            <!-- meters -->
            <div class="bg-white p-3 shadow-3">
              <p-skeleton width="100%" height="100px" />
            </div>
          </div>

          <div class="col-12 md:col-8">
            <!-- vendings -->
            <div class="bg-white p-1">
              <p-skeleton width="100%" height="100px" />
            </div>
          </div>
        </div>

        }
      </section>
    </main>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeterDetailsComponent implements OnInit {

  private adminService = inject(AdminsService)
  
  @Input() set id (adminId: string) {
    
    const admin = localStorage.getItem('admin');

    if (admin) {
      this.admin$ = of(JSON.parse(admin));
      return;
    }

    this.admin$ = this.adminService.getAdminDetailsFakeData(adminId).pipe(
      tap((data) => localStorage.setItem('admin', JSON.stringify(data)))
    );
  }

  admin$!: Observable<any>;

  ngOnInit(): void {}
}
