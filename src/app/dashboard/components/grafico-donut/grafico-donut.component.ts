import { Component, Input, OnInit } from '@angular/core';
import { ChartData } from 'chart.js';

@Component({
  selector: 'grafico-donut',
  templateUrl: './grafico-donut.component.html',
  styleUrls: ['./grafico-donut.component.css']
})
export class GraficoDonutComponent implements OnInit {

  @Input('title') titulo: string = 'Sin título';
  @Input('labels') labels: string[] = ['Label1', 'Label2', 'Label3'];
  @Input('data') data: number[] = [ 350, 450, 100]

  // Doughnut
  public doughnutChartData?: ChartData<'doughnut'>;

  ngOnInit(): void {
    this.doughnutChartData = {
      labels: this.labels,
      datasets: [
        {
          data: this.data,
          backgroundColor: [ '#6857E6', '#009FEE', '#F02059' ],
        },
      ],
    };
  }
}
