import {Component, inject} from '@angular/core';
import {Router} from "@angular/router";
import { UsuarioModel } from '../../../dashboard/models/usuario.model';
import { UsuarioAuthService } from '../../../auth/services/usuario-auth.service';

declare const google: any;

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent {

  private router = inject(Router);
  private usuarioAuthService = inject(UsuarioAuthService);

  public usuario!: UsuarioModel;

  constructor() {
    this.usuario = this.usuarioAuthService.usuario!;
  }

  logout(): void {
    this.usuarioAuthService.logout();
  }

  buscar(termino: string) {
    if (!termino) return;
    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }
}
