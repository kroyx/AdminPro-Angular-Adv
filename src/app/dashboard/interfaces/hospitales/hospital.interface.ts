import { Usuario } from '../../../auth/interfaces';

export interface Hospital {
  nombre: string;
  _id?: string;
  img?: string;
  usuario?: Usuario;
}