import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, type OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-info',
  standalone: true,
  imports: [CommonModule],
  template: `
    <ul class="list-none p-0">
      <!-- datos personales -->
      <li class="mb-3">
        <ul class="list-none pl-2">
          <li class="mb-3">
            <p class="font-bold">{{ admin?.name }}</p>
          </li>
          <div class="grid">
            <div class="col-6 pl-2">
              <li>
                <p class="mb-0 font-bold">Correo</p>
                <p>{{ admin?.email }}</p>
              </li>
              <li>
                <p class="mb-0 font-bold">Teléfono</p>
                <p>{{ admin?.phone }}</p>
              </li>
            </div>
            <div class="col-6 pr-2">
              <li class="text-right">
                <p class="mb-0 font-bold">fecha de registro</p>
                <p>06/07/2024</p>
              </li>
              <li class="text-right">
                <p class="mb-0 font-bold">Contrato</p>
                <p class="font-bold text-green-500">Activo</p>
              </li>
            </div>
          </div>
        </ul>
      </li>
    </ul>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AdminInfoComponent implements OnInit {

  @Input() admin: any;

  ngOnInit(): void {}
}
