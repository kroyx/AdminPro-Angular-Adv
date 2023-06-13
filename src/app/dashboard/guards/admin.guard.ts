import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioAuthService } from '../../auth/services/usuario-auth.service';

export const adminGuard: CanActivateFn = (route, state) => {

  const authService = inject(UsuarioAuthService);
  const router = inject(Router);

  const usuario = authService.usuario;

  if (usuario?.role === 'ADMIN_ROLE') {
    return true;
  }

  router.navigateByUrl('/dashboard');
  return false;
};
