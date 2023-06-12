import { UsuarioModel } from '../../models/usuario.model';

export interface BusquedaUsuarioResponse {
  ok: boolean;
  resultados?: UsuarioModel[];
  msg?: string;
}