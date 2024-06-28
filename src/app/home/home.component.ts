import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { ButtonModule } from "primeng/button";
import { InputTextModule } from "primeng/inputtext";
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { AvailablePayMethodsService } from './service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule
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
               <form autocomplete="off">
                  <!-- serial del medidor -->
                   <div class="mb-6 input-container p-fluid">
                      <p-inputGroup>
                          <p-inputGroupAddon>
                            <i class="pi pi-calculator"></i>
                          </p-inputGroupAddon>
                          <input pInputText placeholder="Identificador del medidor" />
                      </p-inputGroup>
                      <p class="text-center my-2">o</p>
                      <div class="text-center text-sm flex align-items-center justify-content-center gap-2">
                        <i class="pi pi-qrcode"></i>
                         escanea el código QR
                      </div>
                   </div>
                   <div class="flex justify-content-center">
                      <p-button
                        label="Recargar"
                        type="submit"
                        severity="danger"
                        [styleClass]="'w-15rem'" />
                   </div>
               </form>
            </div>
          </section>

          <footer class="pt-2">
            <p class="text-center">
              Medios de pagos disponibles
            </p>
            <!-- slider -->
             <ul class="list-none flex gap-3 justify-content-center p-0 pb-4">
                @for (item of availablePayMethods$ | async; track $index) {
                  <li>
                    <img [src]="item" alt="Método de pago" />
                  </li>
                }
             </ul>
          </footer>
      </section>

      <section class="home__main-container__ad  flex flex-column align-content-center justify-content-center h-screen overflow-hidden w-6 fixed top-0 right-0">
        <div class="w-full h-full flex justify-content-center">
          <img src="assets/ads/ad.jpg" alt="anuncio" class="w-full">
        </div>
      </section>
    </main>
  
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

  .input-container{
    width: 470px
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

  ngOnInit(): void { }

}
