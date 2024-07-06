import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>Admins Home Pages!</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {

  ngOnInit(): void { }

}
