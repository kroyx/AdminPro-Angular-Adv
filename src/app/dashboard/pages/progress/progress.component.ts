import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'app-progress',
  templateUrl: './progress.component.html',
  styleUrls: [ './progress.component.css', ],
})
export class ProgressComponent {

  public progreso1: number = 0;
  public progreso2: number = 0;

  updateProgress1(value: number) {
    this.progreso1 = value;
  }

  updateProgress2(value: number) {
    this.progreso2 = value;
  }
}
