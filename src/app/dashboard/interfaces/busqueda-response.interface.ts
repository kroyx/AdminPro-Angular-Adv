import { Hospital } from './hospitales/hospital.interface';
import { Medico } from './medicos/medico.interface';
import { Usuario } from './usuarios/usuario.interface';

export interface BusquedaResponse {
  ok: boolean;
  msg?: string;
  usuarios?: Usuario[];
  hospitales?: Hospital[];
  medicos?: Medico[];
}