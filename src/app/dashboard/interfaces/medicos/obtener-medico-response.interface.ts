import { Medico } from './medico.interface';

export interface ObtenerMedicoResponse {
  ok: boolean;
  medico?: Medico;
  msg?: string;
}