import { Medico } from './medico.interface';

export interface ActualizarCrearMedicoResponse {
  ok: boolean,
  msg?: string;
  medico?: Medico;
}