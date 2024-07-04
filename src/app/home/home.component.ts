import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject, signal, type OnInit } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { AvailablePayMethodsService, MeterService, RechargeService } from './service';
import { MeterFormComponent, onHideEventType, PaymentMethodsComponent, RechargeInfoComponent } from './components';
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
            
            <div class="flex flex-column gap-4 align-items-center w-full ">
              <div>
                <p class=" mb-0 title">Recarga de saldo</p>
              </div>
              
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

    @if (rechargeOpenDialog()) {
      <app-recharge-info [visible]="rechargeOpenDialog()" (onHide)="onCloseRecharseDialog($event)" />
    }

    <p-dialog 
      header="Datos de recarga" 
      [(visible)]="pasarelaOpenDialog" 
      [modal]="true"
      [draggable]="false"
      [maximizable]="false"
      position="top"
      [style]="{width: '90%', maxWidth: '600px'}"> 
      <span>Pasarela de pago</span>
    </p-dialog>


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
   * @description Métodos de pago disponibles
   */
  availablePayMethods$ = inject(AvailablePayMethodsService).getAvailablePayMethods()

  /**
   * @description Servicio para obtener los datos del medidor
   */
  private meterService = inject(MeterService)

  /**
   * @description Servicio para mostrar mensajes
   */
  private messageService = inject(MessageService)

  /**
   * @description Servicio para realizar la recarga
   */
  private rechargeService = inject(RechargeService)

  /**
   * @description signal para indicar cuando el modal debe de abrirse
   */
  rechargeOpenDialog = signal<boolean>(false)

  /**
   * @description signal para indicar cuando el modal de la pasarela de pago debe de abrirse
   */
  pasarelaOpenDialog = signal<boolean>(false)


  ngOnInit(): void { }

  /**
   * @description Realiza la petición para obtener los datos del medidor
   * @param event código del medidor
   */
  onMeterCodeChange(event: number) {
    this.rechargeOpenDialog.set(true)
    this.meterService.getMeterData(event)
  }

  /**
   * @description Cierra el dialogo de recarga
   */
  onCloseRecharseDialog(event: onHideEventType) { 
    const {action, visible} = event
    
    this.rechargeOpenDialog.set(visible)
    this.meterService.resetState()

    if( action === 'recharge' ){
      this.pasarelaOpenDialog.set(true)
    }


  }


}
