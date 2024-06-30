import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[cInputNumber]',
  standalone: true,
})
export class InputNumberDirective { 

  @Input() maxLengthNumber!: number;
  @Input() onlyPositives: boolean = false;

  constructor(private el: ElementRef) {}

  @HostListener('input', ['$event']) onInput(event: any) {
    const initialValue: string = this.el.nativeElement.value;

    if(this.onlyPositives && Number(initialValue) < 0) {
      this.el.nativeElement.value = Number(initialValue) * -1;
    }

    // Limitar la longitud del número de dígitos enviados
    if (Number(initialValue.length) > this.maxLengthNumber) {
      this.el.nativeElement.value = initialValue.slice(0, this.maxLengthNumber);
    }
  }

}
