import { ChangeDetectionStrategy, Component, computed, EventEmitter, inject, Input, Output, type OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { RechargeInfoFormComponent } from '../recharge-info-form';
import { MeterService, RechargeData, RechargeService } from '../../service';

export interface onHideEventType { 
  visible: boolean,
  action: 'hide' | 'recharge'
}

@Component({
  selector: 'app-recharge-info',
  standalone: true,
  imports: [
    DialogModule,
    RechargeInfoFormComponent
  ],
  template: `
  
  <p-dialog 
      header="Datos de recarga" 
      [(visible)]="visible" 
      [modal]="true"
      (onHide)="onHideFn()"
      [draggable]="false"
      [maximizable]="false"
      position="top"
      [style]="{width: '90%', maxWidth: '600px'}"> 

      @if (rechargeIsActive()) {
        <i class="pi pi-spin pi-spinner"></i>
      }
      @else {
        <app-recharge-info-form (onSubmit)="onSubmit($event)" />
      }
    </p-dialog>
  
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RechargeInfoComponent implements OnInit {

  /**
   * @description Propiedad para mostrar u ocultar el dialogo
   */
  @Input() visible = false;

  /**
   * @description Emite el evento onHide para cerrar el dialogo
   */
  @Output() private onHide = new EventEmitter<onHideEventType>()

  /**
   * @description Servicio para obtener los datos del medidor
   */
  private meterService = inject(MeterService)

  /**
   * @description Servicio para realizar la recarga
   */
  private rechargeService = inject(RechargeService)

  /**
   * @description Indica si la recarga está activa y se está realizando la petición
   */
  rechargeIsActive = computed(() => {

    if (this.meterService.state$.loading) 
      return true
    

    if (this.meterService.state$.error) {
      this.onHideFn()
      return false
    }

    if (this.meterService.state$.success && this.meterService.state$.data) {
      return false
    }
   
    return false
  })


  /**
   * @description Obtiene los datos del estado del servicio del medidor 
   * @readonly solo lectura para evitar mutaciones y solo saber si las peticiones están en curso o han terminado, si ha ocurrido un error o si ha sido exitosa
   */
  get meterState() {
    return this.meterService.state$
  }

  /**
   * @description Emite el evento onHide para cerrar el dialogo
   */
  onHideFn(type: onHideEventType = { visible: false, action: 'hide' } ) {
    this.onHide.emit(type)
  }

  /**
   * 
   * @param event datos de la recarga
   */
  onSubmit(event: Omit<RechargeData, 'meterCode'>) {

    this.rechargeService.rechargeDataValue = {
      ...event,
      meterCode: this.meterService.state$.data?.meterCode || '1234567890'
    }

    this.onHideFn({
      visible: false,
      action: 'recharge'
    })

  }
  
  ngOnInit(): void { 
  }


}
