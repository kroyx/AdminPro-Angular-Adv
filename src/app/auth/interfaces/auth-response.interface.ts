import { Usuario } from '../../dashboard/interfaces/usuarios/usuario.interface';

export interface MenuItem {
  title: string;
  icon?: string;
  url?: string;
  submenu?: MenuItem[];
}

export interface AuthResponse {
  ok: boolean;
  msg?: string;
  usuario?: Usuario;
  token?: string;
  picture?: string;
  menu?: MenuItem[];
}