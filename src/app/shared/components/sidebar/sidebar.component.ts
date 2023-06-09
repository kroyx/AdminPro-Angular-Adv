import {Component, inject} from '@angular/core';
import { UsuarioModel } from '../../../auth/models/usuario.model';
import { UsuarioService } from '../../../auth/services/usuario.service';
import {MenuItem, SidebarService} from "../../services/sidebar.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  public sidebarService = inject(SidebarService);
  private usuarioService = inject(UsuarioService);

  public menuItems!: MenuItem[];
  public usuario!: UsuarioModel;

  constructor() {
    this.menuItems = this.sidebarService.menuApp;
    this.usuario = this.usuarioService.usuario!;
  }
}
