import { HospitalModel } from '../../models';

export interface BusquedaHospitalResponse {
  ok: boolean;
  resultados?: HospitalModel[];
  msg?: string;
}