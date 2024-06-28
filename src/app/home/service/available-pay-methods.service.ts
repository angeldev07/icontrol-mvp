import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailablePayMethodsService {

  /**
   * URL de las imágenes de los métodos de pago
   */
  private imagesUrl = 'assets/pay-methods';

  /**
   * Http client para hacer peticiones 
   */
  private http = inject(HttpClient)

  constructor() { }

  /**
   * @description Obtiene las rutas de las imágenes de los métodos de pago
   * @returns un arreglo de strings con las rutas de las imágenes de los métodos de pago
   */
  getAvailablePayMethods() {
    return this.http.get<string[]>(`${this.imagesUrl}/methods.json`).pipe(
      map( imgs => imgs.map( img => `${this.imagesUrl}/${img}`))
    )
  }

}
