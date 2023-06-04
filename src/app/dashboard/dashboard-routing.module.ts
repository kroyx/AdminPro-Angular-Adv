import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoPageFoundComponent } from '../shared/pages/no-page-found/no-page-found.component';
import { DashboardLayoutComponent } from './layouts/dashboard-layout/dashboard-layout.component';
import { AccountSettingsComponent } from './pages/account-settings/account-settings.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { Grafica1Component } from './pages/grafica1/grafica1.component';
import { ProgressComponent } from './pages/progress/progress.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardLayoutComponent,
    children: [
      { path: '', component: DashboardComponent, pathMatch: 'full' },
      { path: 'grafica1', component: Grafica1Component },
      { path: 'progress', component: ProgressComponent },
      { path: 'account-settings', component: AccountSettingsComponent },
      { path: '**', component: NoPageFoundComponent },
    ],
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class DashboardRoutingModule {}
