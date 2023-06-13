import { Hospital, Medico, Usuario } from '../interfaces';

export class MedicoModel {

  public nombre: string;
  public _id?: string;
  public img?: string;
  public usuario?: Usuario;
  public hospital?: Hospital;

  constructor(medico: Medico) {
    this.nombre = medico.nombre;
    this._id = medico._id;
    this.img = medico.img;
    this.usuario = medico.usuario;
    this.hospital = medico.hospital;
  }
}