import { Usuario } from '../../dashboard/interfaces/usuarios/usuario.interface';

export interface AuthResponse {
  ok: boolean;
  msg?: string;
  usuario?: Usuario;
  token?: string;
  picture?: string;
}