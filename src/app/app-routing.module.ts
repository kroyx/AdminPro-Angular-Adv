import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoPageFoundComponent } from './shared/pages/no-page-found/no-page-found.component';
import {DashboardRoutingModule} from "./dashboard/dashboard-routing.module";
import {AuthRoutingModule} from "./auth/auth-routing.module";
import {SharedModule} from "./shared/shared.module";

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule),
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: '**', component: NoPageFoundComponent },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routes),
    // DashboardRoutingModule,
    // AuthRoutingModule
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule {}
