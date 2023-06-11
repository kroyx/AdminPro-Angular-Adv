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
  private usuarioService = inject(UsuarioAuthService);

  public usuario!: UsuarioModel;

  constructor() {
    this.usuario = this.usuarioService.usuario!;
  }

  logout(): void {
    this.router.navigateByUrl('/auth/login');
    sessionStorage.removeItem('token');
  }

  googleLogout() {
    const googleAccount = this.usuarioService.googleEmail;

    if (!googleAccount) return;

    google.accounts.id.revoke( googleAccount, () => {
      this.router.navigateByUrl('/auth/login');
    });
  }
}
