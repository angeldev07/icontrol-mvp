import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-payment-methods',
  standalone: true,
  imports: [
    AsyncPipe
  ],
  template: `
  
  <ul class="list-none flex gap-3 justify-content-center p-0 pb-4">
    @for (item of availablePayMethods$ | async; track $index) {
      <li>
        <img [src]="item" alt="Método de pago" />
      </li>
    }@empty {
      <li>
        <p>No hay métodos de pago disponibles</p>
      </li>
    }
    </ul> 
  
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentMethodsComponent implements OnInit {

  @Input() availablePayMethods$: Observable<string[]> = new Observable();

  ngOnInit(): void { }

}
