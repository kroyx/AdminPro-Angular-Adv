import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';

@Component({
  selector: 'dashboard-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: [ './incrementador.component.css' ],
})
export class IncrementadorComponent {

  @Input('valor') progreso: number = 0;
  @Input('color') btnClass: string = 'btn-primary';

  @Output() public onValorChange: EventEmitter<number> = new EventEmitter<number>();

  @ViewChild('inputIncremento') inputIncremento!: ElementRef<HTMLInputElement>;


  cambiarValor(valor: number) {
    this.progreso = this.progreso + valor;
    this.onChange();
  }

  onChange() {
    if (!this.progreso || this.progreso < 0) {
      this.progreso = 0;
    }
    else if (this.progreso > 100) {
      this.progreso = 100;
    }
    this.inputIncremento.nativeElement.value = this.progreso.toString();
    this.onValorChange.emit(this.progreso);
  }
}
