import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { IncrementadorComponent } from './components/incrementador/incrementador.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { GraficoDonutComponent } from './components/grafico-donut/grafico-donut.component';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardComponent,
    Grafica1Component,
    ProgressComponent,
    IncrementadorComponent,
    GraficoDonutComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    NgChartsModule,
  ],
})
export class DashboardModule {}
