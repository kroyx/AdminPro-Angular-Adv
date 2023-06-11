import { UsuarioModel } from '../models/usuario.model';

export interface ActualizarUsuarioResponse {
  ok: boolean;
  msg?: string;
  usuario?: UsuarioModel;
}