import { Component, computed, inject, Signal } from '@angular/core';
import { MenuItem } from '../../../auth/interfaces';
import { UsuarioAuthService } from '../../../auth/services/usuario-auth.service';
import { UsuarioModel } from '../../../dashboard/models/usuario.model';
import { SidebarService } from "../../services/sidebar.service";

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [],
})
export class SidebarComponent {

  private usuarioService = inject(UsuarioAuthService);
  public sidebarService  = inject(SidebarService);
  // public menuItems = computed( () => this.sidebarService.menuApp());
  public menuItems!: Signal<MenuItem[]>
  public usuario!: UsuarioModel;

  constructor() {
    this.usuario   = this.usuarioService.usuario!;
    this.menuItems = this.sidebarService.menuApp;
  }
}
