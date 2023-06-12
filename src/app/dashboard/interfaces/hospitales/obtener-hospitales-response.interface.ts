import { HospitalModel } from '../../models';

export interface ObtenerHospitalesResponse {
  ok: boolean;
  total?: number;
  hospitales?: HospitalModel[];
  msg?: string;
}