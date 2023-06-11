import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { tap } from 'rxjs';
import { UsuarioAuthService } from '../services/usuario-auth.service';

export const authGuard: CanActivateFn = (route, state) => {

  const usuarioService = inject(UsuarioAuthService);
  const router = inject(Router);


  return usuarioService.validarToken()
    .pipe(
      tap( estaAutenticado => {
        if (!estaAutenticado) {
          router.navigateByUrl('/auth/login');
        }
      })
    );
};
