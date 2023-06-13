import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgChartsModule } from 'ng2-charts';
import { SharedModule } from '../shared/shared.module';
import { IncrementadorComponent } from './components/incrementador/incrementador.component';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { GraficoDonutComponent } from './components/grafico-donut/grafico-donut.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { PromesasComponent } from './pages/promesas/promesas.component';
import { RxjsComponent } from './pages/rxjs/rxjs.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { UsuariosComponent } from './pages/mantenimientos/usuarios/usuarios.component';
import { HospitalesComponent } from './pages/mantenimientos/hospitales/hospitales.component';
import { MedicosComponent } from './pages/mantenimientos/medicos/medicos.component';
import { ModalImagenComponent } from './components/modal-imagen/modal-imagen.component';
import { ImagenPipe } from './pipes/imagen.pipe';
import { MedicoComponent } from './pages/mantenimientos/medico/medico.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';


@NgModule({
  declarations: [
    DashboardLayoutComponent,
    DashboardComponent,
    Grafica1Component,
    ProgressComponent,
    IncrementadorComponent,
    GraficoDonutComponent,
    AccountSettingsComponent,
    PromesasComponent,
    RxjsComponent,
    PerfilComponent,
    UsuariosComponent,
    HospitalesComponent,
    MedicosComponent,
    ModalImagenComponent,
    ImagenPipe,
    MedicoComponent,
    BusquedaComponent,
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,
    SharedModule,
    FormsModule,
    NgChartsModule,
    ReactiveFormsModule,
  ],
})
export class DashboardModule {}
