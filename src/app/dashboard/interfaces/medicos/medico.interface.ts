import { Hospital } from '../hospitales/hospital.interface';
import { Usuario } from '../usuarios/usuario.interface';

export interface Medico {
  nombre: string;
  _id?: string;
  img?: string;
  usuario?: Usuario;
  hospital?: Hospital;
}