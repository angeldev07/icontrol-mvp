import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-meters-list',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule
  ],
  template: `
    <ul class="list-none p-0 m-0">
      <li class="">
        <p class="font-bold">Medidores</p>
        <ul class="list-none p-0 w-full card-meter">
          <li class="border-1  border-round p-3 flex justify-content-between">
            <div>
              <p class="font-bold mb-0">Av4 # an 50 Guaimaral</p>
              <p>
                <span class="font-bold">Codigo: </span>
                12334556
              </p>
            </div>
            <p-button
              icon="pi pi-qrcode"
              [rounded]="true"
              [text]="true"
              severity="secondary"
            />
          </li>
        </ul>
      </li>
    </ul>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MetersListComponent implements OnInit {
  ngOnInit(): void {}
}
