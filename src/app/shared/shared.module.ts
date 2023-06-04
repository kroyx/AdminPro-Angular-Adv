import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { BreadcrumbsComponent } from './components/breadcrumbs/breadcrumbs.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { NoPageFoundComponent } from './pages/no-page-found/no-page-found.component';


@NgModule({
  declarations: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    NoPageFoundComponent,
  ],
  imports: [
    RouterModule
  ],
  exports: [
    BreadcrumbsComponent,
    SidebarComponent,
    HeaderComponent,
    NoPageFoundComponent,
  ],
})
export class SharedModule {}
