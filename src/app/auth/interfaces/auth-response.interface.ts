import { Usuario } from './usuario.interface';

export interface AuthResponse {
  ok: boolean;
  msg?: string;
  usuario?: Usuario;
  token?: string;
  picture?: string;
}