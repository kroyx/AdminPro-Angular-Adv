import { MedicoModel } from '../../models';

export interface BusquedaMedicoResponse {
  ok: boolean;
  resultados?: MedicoModel[];
  msg?: string;
}