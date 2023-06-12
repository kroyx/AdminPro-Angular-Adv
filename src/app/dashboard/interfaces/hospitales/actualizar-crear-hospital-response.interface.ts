import { Hospital } from './hospital.interface';

export interface ActualizarCrearHospitalResponse {
  ok: boolean,
  msg?: string;
  hospital?: Hospital;
}