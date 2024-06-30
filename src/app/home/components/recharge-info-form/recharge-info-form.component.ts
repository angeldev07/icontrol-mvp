import { ChangeDetectionStrategy, Component, inject, type OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { StepperModule } from 'primeng/stepper';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { ButtonModule } from 'primeng/button';
import { RadioButtonModule } from "primeng/radiobutton";
import { InputNumberModule } from 'primeng/inputnumber';
import { CurrencyPipe, NgClass } from '@angular/common';

@Component({
  selector: 'app-recharge-info-form',
  standalone: true,
  imports: [
    StepperModule,
    ReactiveFormsModule,
    InputTextModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    RadioButtonModule,
    InputNumberModule,
    ReactiveFormsModule,
    CurrencyPipe,
    NgClass
  ],
  template: `

    <form [formGroup]="rechargeForm">
      
      <div class="py-3">

        <div class="p-fluid mb-3">
          <label for="email" class="block mb-4">Ingrese un correo para continuar</label>
          <p-inputGroup>
            <input 
              type="text" 
              pInputText 
              placeholder="ejemplo@dominio.com"
              formControlName="email"
              [ngClass]="{'ng-dirty ng-invalid': email?.invalid && email?.touched}"
              id="email" />
            @if (activeIndex === -1) {
              <button 
              type="button" 
              pButton 
              icon="pi pi-check"
              [disabled]="email?.invalid"
              (click)="onSubmitEmail()"
              class="p-button-success"></button>
            } @else {
              <button 
              type="button" 
              pButton 
              icon="pi pi-pencil"
              (click)="onEditEmail()"></button>
            }
          </p-inputGroup>
          @if (email?.invalid && email?.touched) {
            <small class="text-red-500">Correo inválido</small>
          }
        </div>

        <div>
          <label  class="block mb-3">Datos de recarga</label>
          <p-stepper orientation="vertical" [linear]="true" [activeStep]="activeIndex" >
            <p-stepperPanel header="Tipo de recarga">
              <ng-template pTemplate="content" let-nextCallback="nextCallback" let-index="index">
                  <div class="flex flex-column ">
                    <div>
                      <strong class="text-sm">Valor kW/unidad: 900$</strong>
                    </div>
                    <ul class="list-none p-0 flex flex-column gap-3">
                      @for (option of rechargeTypes; track $index) {  
                        <li class="shadow-1 p-3 border-round p-fluid">
                          <p-radioButton 
                              [inputId]="option.value"
                              [value]="option.value"
                              (onClick)="nextCallback.emit()"
                              formControlName="rechargeType"  />
                              <label [for]="option.value" class="m-2 block w-full">
                                {{ option.label }}
                              </label>
                        </li>
                      }
                      </ul>
                    </div>
                </ng-template>
            </p-stepperPanel>

            <p-stepperPanel header="Cantidad a recargar">
                <ng-template pTemplate="content" let-prevCallback="prevCallback" let-nextCallback="nextCallback" let-index="index">
                    <div>
                      @if (rechargeType?.value === 'saldo') {
                        <p-inputNumber 
                          inputId="currency-cop" 
                          mode="currency" 
                          currency="COP" 
                          locale="en-CO"
                          formControlName="rechargeAmount"
                          [min]="1000" /> 
                      }

                      @if (rechargeType?.value === 'kwh' ) {
                        <p-inputNumber 
                          prefix="↑ " 
                          inputId="temperature" 
                          suffix=" kw" 
                          formControlName="rechargeAmount"
                          [min]="0" />
                      }

                    </div>
                    <div class="flex py-4 gap-2">
                        <p-button label="Regresar" severity="secondary" (onClick)="prevCallback.emit()" />
                        <p-button label="Siguiente" (onClick)="nextCallback.emit()" />
                    </div>
                </ng-template>
            </p-stepperPanel>

            <p-stepperPanel header="Resumen">
                <ng-template pTemplate="content" let-prevCallback="prevCallback" let-index="index">
                    <div>
                        <div>
                          <ul class="list-none p-0">
                            <li class="mb-3">
                              correo: 
                              <span class="block my-2 pl-2">
                                {{email?.value}}
                              </span>
                            </li>
                            <li class="mb-3">
                              tipo de recarga: 
                              <span class="block my-2 pl-2">
                                {{ rechargeType?.value }}
                              </span>
                            </li>
                            <li class="mb-3">
                              cantidad a recargar: 
                              <span class="block my-2 pl-2">
                                @if (rechargeType?.value === 'saldo') {
                                  {{ rechargeAmount?.value | currency:'COP' }}
                                } @else {
                                  {{ rechargeAmount?.value }} kw
                                }
                              </span>
                            </li>
                            <li class="mb-3">
                              valor a pagar: 
                              <span class="block my-2 pl-2">
                                9000$
                              </span>
                            </li>
                          </ul>
                        </div>
                    </div>
                    <div class="flex justify-content-between py-4 gap-4">
                        <p-button label="Regresar" severity="secondary" (onClick)="prevCallback.emit()" />
                        <p-button label="Recargar" severity="danger" />
                    </div>
                </ng-template>
            </p-stepperPanel>
          </p-stepper>
        </div>

      </div>

    </form>
  
  
  
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RechargeInfoFormComponent implements OnInit {

  /**
   * @description tipos de recargas permitidos
   */
  rechargeTypes = [
    {
      label: 'Recarga por saldo ($)',
      value: 'saldo'
    },
    {
      label: 'Recarga por kWh',
      value: 'kwh'
    }
  ]

  /**
   * @description Form builder instance para crear formularios reactiv
   * @private   
   * @type {FormBuilder}
  */
  private fb = inject(FormBuilder)

  /**
   * @description Formulario de recarga
  */
  rechargeForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    rechargeType: ['', [Validators.required]],
    rechargeAmount: [0, [Validators.required]]
  })

  /**
   * @description Indice activo del stepper
   */
  activeIndex = -1

  /**
   * @description Getter para obtener el control del email
   * @readonly
  */
  get email() {
    return this.rechargeForm.get('email')
  }

  /**
   * @description Getter para obtener el control del tipo de recarga
   * @readonly
  */
  get rechargeType() {
    return this.rechargeForm.get('rechargeType')
  }

  /**
   * @description Getter para obtener el control de la cantidad de recarga
   * @readonly
  */
  get rechargeAmount() {
    return this.rechargeForm.get('rechargeAmount')
  }

  /**
   * @description Método que se ejecuta al enviar el correo
  */
  onSubmitEmail() {
    if (!this.email?.valid) {
      return
    }

    this.activeIndex = 0
    this.rechargeForm.get('email')?.disable()
  }

  /**
   * @description Método que se ejecuta al editar el correo
  */
  onEditEmail() {
    this.activeIndex = -1
    this.rechargeForm.get('email')?.enable()
  }


  ngOnInit(): void { }

}
