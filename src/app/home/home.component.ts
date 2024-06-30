import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal, type OnInit } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { AvailablePayMethodsService, MeterService } from './service';
import { MeterFormComponent, PaymentMethodsComponent, RechargeInfoComponent } from './components';
import { DialogModule } from "primeng/dialog";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-home',
  standalone: true,
  providers: [MessageService],
  imports: [
    CommonModule,
    ButtonModule,
    MeterFormComponent,
    DialogModule,
    ToastModule,
    PaymentMethodsComponent,
    RechargeInfoComponent
  ],
  template: `
  
    <main class="home__main-container flex w-full min-h-screen">

      <section class=" home__main-container__form flex flex-column w-6 min-h-screen justify-content-between">
          <header class="w-full flex align-items-center justify-content-center py-3">
            <div class="w-15rem">
              <img src="assets/icontrol.png" alt="logo de icontrol" class="w-full">
            </div>
          </header>
          
          <section class="flex flex-column align-items-center justify-content-center w-full form-section py-4 px-0">
            <!-- opciones a elegir  -->
             <div class="p-2 w-20rem btn-container shadow-3 mb-4 flex gap-3 ">
                <button class="btn w-6 active hover:shadow-1">
                    Recargar
                </button>
                <button class="btn w-6 hover:shadow-1">
                  Huésped
                </button>
             </div>
            <!-- contenido principal -->
            <div class="flex flex-column gap-4 align-items-center w-full ">
              <div>
                <p class=" mb-0 title">Recarga de saldo</p>
              </div>
              <!-- formulario -->
              <app-meter-form (onMeterCodeChange)="onMeterCodeChange($event)" />
            </div>
          </section>

          <footer class="pt-2">
            <p class="text-center">
              Medios de pagos disponibles
            </p>
            <app-payment-methods [availablePayMethods$]="availablePayMethods$" />
          </footer>
      </section>

      <section class="home__main-container__ad  flex flex-column align-content-center justify-content-center h-screen overflow-hidden w-6 fixed top-0 right-0">
        <div class="w-full h-full flex justify-content-center">
          <img src="assets/ads/ad.jpg" alt="anuncio" class="w-full">
        </div>
      </section>
    </main>

    <app-recharge-info [visible]="rechargeIsActive()" />
      
    <p-toast />
  `,
  styles: `
  .form-section{
    min-height: 55vh;
  }

  .title {
    font-style: normal;
    font-weight: 700;
    font-size: 24px;
    line-height: 33px;
    text-align: center;
  }

  .btn-container{
    border-radius: 25px;
  }

  .btn {
      outline: none;
      border: none;
      border-radius: 25px;
      padding: .5rem 1rem;
      cursor: pointer;
  }


  .btn.active{
    background-color: #ef4444;
    color: #fff;
    font-weight: 700;
  }
  @media only screen and (max-width: 1024px) {
    .home__main-container {
      flex-flow: column wrap !important;
      min-height: 80vh !important;
    }
    
    .home__main-container__form  {
      overflow: hidden;
      width: 100% !important;
      min-height: 80vh !important;
    }

    .home__main-container__ad {
        position: inherit !important;
        width: 100% !important;
        max-height: 20vw ! important;
        padding: 5px ! important;
    }

    .input-container{
      width: 350px
    }
  }
  
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {


  /**
   * @description Servicio para obtener los métodos de pago disponibles
   */
  avaibleMethodsService = inject(AvailablePayMethodsService)

  /**
   * @description Métodos de pago disponibles
   */
  availablePayMethods$ = this.avaibleMethodsService.getAvailablePayMethods()

  /**
   * @description Servicio para obtener los datos del medidor
   */
  meterService = inject(MeterService)

  /**
   * @description Servicio para mostrar mensajes
   */
  messageService = inject(MessageService)

  /**
   * @description computed value para determinar cuando se muestra el dialogo de recarga
   */
  rechargeIsActive = computed(() => {
    if (this.meterService.state$.loading) {
      return true
    }

    if (this.meterService.state$.error) {
      this.messageService.add({ severity: 'error', summary: 'Error', detail: 'Ha ocurrido un error' })
      return false
    }

    return true
  })


  ngOnInit(): void { }

  /**
   * @description Obtiene los datos del estado del servicio del medidor 
   * @readonly solo lectura para evitar mutaciones y solo saber si las peticiones están en curso o han terminado, si ha ocurrido un error o si ha sido exitosa
   */
  get meterState() {
    return this.meterService.state$
  }

  /**
   * @description Realiza la petición para obtener los datos del medidor
   * @param event código del medidor
   */
  onMeterCodeChange(event: number) {
    this.meterService.getMeterData(event)
  }


}
