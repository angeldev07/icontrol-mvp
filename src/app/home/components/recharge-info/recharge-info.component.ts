import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, Signal, signal, type OnInit } from '@angular/core';
import { DialogModule } from 'primeng/dialog';
import { RechargeInfoFormComponent } from '../recharge-info-form';

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
      [draggable]="false"
      [maximizable]="false"
      position="top"
      [style]="{width: '90%', maxWidth: '600px'}"> 

      <app-recharge-info-form />

    </p-dialog>
  
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RechargeInfoComponent implements OnInit {

  @Input() visible = false;

  
  ngOnInit(): void { 
  }

}
