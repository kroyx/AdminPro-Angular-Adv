import { MedicoModel } from '../../models';

export interface ObtenerMedicosResponse {
  ok: boolean;
  total?: number;
  medicos?: MedicoModel[];
  msg?: string;
}