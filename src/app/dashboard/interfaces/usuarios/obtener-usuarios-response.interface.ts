import { UsuarioModel } from '../../models/usuario.model';

export interface ObtenerUsuariosResponse {
  ok: boolean;
  total?: number;
  usuarios?: UsuarioModel[];
  msg?: string;
}