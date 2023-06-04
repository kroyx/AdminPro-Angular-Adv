import { Component } from '@angular/core';

@Component({
  selector: 'app-grafica1',
  templateUrl: './grafica1.component.html',
  styles: [],
})
export class Grafica1Component {


  public labels: string[] = [ 'Alimentación', 'Software', 'Muebles' ];
  public data: number[] = [ 120, 520, 260 ];
}
