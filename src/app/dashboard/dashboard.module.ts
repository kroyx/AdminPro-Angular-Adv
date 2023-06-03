import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { IncrementadorComponent } from './components/incrementador/incrementador.component';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardComponent,
    Grafica1Component,
    ProgressComponent,
    IncrementadorComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
  ],
})
export class DashboardModule { }
