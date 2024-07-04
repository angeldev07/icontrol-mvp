import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';

interface MeterState { 
  loading: boolean;
  error: boolean;
  success: boolean;
  data: any
}

@Injectable({
  providedIn: 'root'
})
export class MeterService {

  /**
   * @description Servicio para hacer peticiones http
   */
  private http = inject(HttpClient) 

  /**
   * @description Estado del servicio 
   */
  private state = signal<MeterState> ({
    loading: false,
    error: false,
    success: false,
    data: null
  })

  /**
   * @description Getter para obtener el estado del servicio
   */
  get state$() {
    return this.state()
  }

  /**
   * @description Actualiza el estado del servicio para cuando se inicia una petición
   */
  private updateState() {
    this.state.set(
      {
        loading: true,
        error: false,
        success: false,
        data: null
      }
    )
  }

  /**
   * @description Estado inicial del servicio
   */
  private get initialState(){
    return {
      loading: false,
      error: false,
      success: false,
      data: null
    }
  }

  /**
   * Obtiene los datos del medidor.
   * @param code serial del medidor
   */
  getMeterData(code: number) {
    this.updateState()
    // simular una petición http
    setTimeout(() => {
      this.state.update(prevState => ({
        loading: false,
        success: true,
        error: false,
        data: {
          code,
          name: 'Medidor 1',
          address: 'Calle 1 # 1-1'
        }
      }))
    }, 2000)
  }

  /**
   * @description Reinicia el estado del servicio
   */
  resetState() {
    this.state.set(this.initialState)
  }


}
