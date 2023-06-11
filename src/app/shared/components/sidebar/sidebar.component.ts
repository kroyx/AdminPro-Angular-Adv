import {Component, inject} from '@angular/core';
import { UsuarioModel } from '../../../dashboard/models/usuario.model';
import { UsuarioAuthService } from '../../../auth/services/usuario-auth.service';
import {MenuItem, SidebarService} from "../../services/sidebar.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  public sidebarService = inject(SidebarService);
  private usuarioService = inject(UsuarioAuthService);

  public menuItems!: MenuItem[];
  public usuario!: UsuarioModel;

  constructor() {
    this.menuItems = this.sidebarService.menuApp;
    this.usuario = this.usuarioService.usuario!;
  }
}
