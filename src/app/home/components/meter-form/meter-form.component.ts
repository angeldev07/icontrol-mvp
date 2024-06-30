import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, EventEmitter, Output, signal, type OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputGroupModule } from 'primeng/inputgroup';
import { InputGroupAddonModule } from 'primeng/inputgroupaddon';
import { InputTextModule } from 'primeng/inputtext';
import { InputNumberDirective } from '../../../shared';




@Component({
  selector: 'app-meter-form',
  standalone: true,
  imports: [
    CommonModule,
    InputGroupModule,
    InputGroupAddonModule,
    ButtonModule,
    InputTextModule,
    FormsModule,
    InputNumberDirective,
  ],
  template: `
  
    <!-- formulario -->
    <form autocomplete="off">
      <!-- serial del medidor -->
        <div class="mb-6 input-container p-fluid">
          <p-inputGroup>
              <p-inputGroupAddon>
                <i class="pi pi-calculator"></i>
              </p-inputGroupAddon>
              <input 
                cInputNumber
                [maxLengthNumber]="11"
                [onlyPositives]="true"
                pInputText 
                placeholder="Serial del medidor" 
                type="number"
                name="meterCode"
                maxlength="11"
                [(ngModel)]="meterCode" />
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
            [styleClass]="'w-15rem'"
            [disabled]="disabled"
            (onClick)="onEmitMeterCode()" />
        </div>
    </form>
  
  
  `,
  styles: `
  .input-container{
    width: 470px
  }

  @media only screen and (max-width: 1024px) {
    .input-container{
      width: 350px
    }
  }
  
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MeterFormComponent implements OnInit {

  /**
   * @description Código del medidor
   */
  meterCode = signal<number | undefined>(undefined)

  /**
   * @description Emite el código del medidor
   */
  @Output() onMeterCodeChange = new EventEmitter<number>()

  ngOnInit(): void { }

  /**
   * @description Determina si el botón de recargar está deshabilitado
   */
  get disabled() {
    return !this.meterCode() || this.meterCode()!.toString().length < 11
  }

  onEmitMeterCode() { 
    this.onMeterCodeChange.emit(this.meterCode())
  }
}
