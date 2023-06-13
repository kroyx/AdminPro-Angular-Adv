import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoPageFoundComponent } from '../shared/pages/no-page-found/no-page-found.component';
import { adminGuard } from './guards/admin.guard';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { BusquedaComponent } from './pages/busqueda/busqueda.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { HospitalesComponent } from './pages/mantenimientos/hospitales/hospitales.component';
import { MedicoComponent } from './pages/mantenimientos/medico/medico.component';
import { MedicosComponent } from './pages/mantenimientos/medicos/medicos.component';
import { UsuariosComponent } from './pages/mantenimientos/usuarios/usuarios.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { PromesasComponent } from './pages/promesas/promesas.component';
import { RxjsComponent } from './pages/rxjs/rxjs.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: DashboardComponent, pathMatch: 'full', data: { titulo: 'Dashboard' } },
      {
        path: 'account-settings',
        component: AccountSettingsComponent,
        data: { titulo: 'Ajustes de la cuenta' },
      },
      { path: 'buscar/:termino', component: BusquedaComponent, data: { titulo: 'Búsquedas' } },
      { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1' } },
      { path: 'perfil', component: PerfilComponent, data: { titulo: 'Perfil de usuario' } },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' } },
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },


      // Mantenimientos
      {
        path: 'hospitales',
        component: HospitalesComponent,
        data: { titulo: 'Mantenimiento de Hospitales' },
      },
      {
        path: 'medicos',
        component: MedicosComponent,
        data: { titulo: 'Mantenimiento de Medicos' },
      },
      {
        path: 'medico/:id',
        component: MedicoComponent,
        data: { titulo: 'Mantenimiento de Medicos' },
      },

      // Rutas de Admin
      {
        path: 'usuarios',
        canActivate: [ adminGuard ],
        component: UsuariosComponent,
        data: { titulo: 'Mantenimiento de Usuarios' },
      },

      { path: '**', component: NoPageFoundComponent },
    ],
  },
  // {
  //   path: 'dashboard',
  //   component: DashboardLayoutComponent,
  //   children: [
  //     { path: '', component: DashboardComponent},
  //     { path: 'grafica1', component: Grafica1Component },
  //     { path: 'progress', component: ProgressComponent },
  //     { path: 'account-settings', component: AccountSettingsComponent },
  //   ],
  // },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class DashboardRoutingModule {}
