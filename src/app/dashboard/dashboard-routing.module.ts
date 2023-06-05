import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoPageFoundComponent } from '../shared/pages/no-page-found/no-page-found.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { ProgressComponent } from './pages/progress/progress.component';
import { PromesasComponent } from './pages/promesas/promesas.component';
import { RxjsComponent } from './pages/rxjs/rxjs.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: DashboardComponent, pathMatch: 'full', data: { titulo: 'Dashboard' } },
      { path: 'grafica1', component: Grafica1Component, data: { titulo: 'Gráfica #1' } },
      { path: 'progress', component: ProgressComponent, data: { titulo: 'ProgressBar' } },
      { path: 'account-settings', component: AccountSettingsComponent, data: { titulo: 'Ajustes de la cuenta' } },
      { path: 'promesas', component: PromesasComponent, data: { titulo: 'Promesas' } },
      { path: 'rxjs', component: RxjsComponent, data: { titulo: 'Rxjs' } },
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
