import { Injectable, signal } from '@angular/core';

export interface RechargeData {
  email: string;
  rechargeType: string;
  rechargeAmount: number;
  total?: number;
  meterCode: string;
}

@Injectable({
  providedIn: 'root'
})
export class RechargeService {

  /**
   * @description Señal para almacenar los datos de la recarga a realizar 
   */
  private rechargeData = signal<RechargeData>({
    email: '',
    rechargeType: '',
    rechargeAmount: 0,
    total: 0,
    meterCode: ''
  })

  /**
   * @description Setter para almacenar los datos de la recarga a realizar
   */
  public set rechargeDataValue(value: RechargeData) {
    this.rechargeData.set(value)
  }

  /**
   * @description Getter para obtener los datos de la recarga a realizar
   */
  public get rechargeDataValue(): RechargeData {
    return this.rechargeData()
  }

}
