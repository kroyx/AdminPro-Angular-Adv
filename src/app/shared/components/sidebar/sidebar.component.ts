import {Component, inject} from '@angular/core';
import {MenuItem, SidebarService} from "../../services/sidebar.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  public sidebarService = inject(SidebarService);

  public menuItems!: MenuItem[];

  constructor() {
    this.menuItems = this.sidebarService.menuApp;
  }
}
