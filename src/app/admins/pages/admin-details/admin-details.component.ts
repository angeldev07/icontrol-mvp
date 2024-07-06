import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, Input, type OnInit } from '@angular/core';
import { AdminsService } from '../../services';
import { Observable, of, tap } from 'rxjs';
import { RouterLink } from '@angular/router';
import { AdminInfoComponent, MetersListComponent, VendingsListComponent } from '../../components';
import { SkeletonModule } from 'primeng/skeleton';

@Component({
  selector: 'app-admin-details',
  standalone: true,
  imports: [
    CommonModule,
    SkeletonModule,
    RouterLink,
    AdminInfoComponent,
    MetersListComponent,
    VendingsListComponent,
  ],
  template: `

    <main class="p-3"> 

      <section class="">

        <div class="bg-white p-3 shadow-3  mb-4 flex align-items-center gap-4">
          <a [routerLink]="['../']" >
            <i class="pi pi-arrow-left cursor-pointer"></i>
          </a>
          <div>
            <p class="m-0 uppercase font-bold">Datos registrados del administrador</p>
            <span>Información detallada</span>
          </div>
        </div>

        <!-- datos -->
        @if(admin$ | async; as admin){

          <div class="grid">

            <div class="col-12 md:col-4">
              <!-- info -->
              <div class="bg-white p-3 shadow-3 mb-4">
                <app-admin-info [admin]="admin" /> 
              </div>
              <!-- meters -->
              <div class="bg-white p-3 shadow-3">
                <app-meters-list />
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
  styles: `
    .card-meter {
      width: 100%;
      max-width: 400px; 
    }
  
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminDetailsComponent implements OnInit {

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

  ngOnInit(): void { }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    localStorage.removeItem('admin');
  }

}
