import { UsuarioModel } from '../models/usuario.model';

export interface BusquedaResponse {
  ok: boolean;
  resultados?: UsuarioModel[];
  msg?: string;
}