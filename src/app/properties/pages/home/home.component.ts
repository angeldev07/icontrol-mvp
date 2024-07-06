import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, type OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
  ],
  template: `<p>Properties Admins Home Page</p>`,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {

  ngOnInit(): void { }

}
