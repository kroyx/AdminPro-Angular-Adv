import { UsuarioModel } from '../../auth/models/usuario.model';

export interface ObtenerUsuariosResponse {
  ok: boolean;
  total?: number;
  usuarios?: UsuarioModel[];
  msg?: string;
}