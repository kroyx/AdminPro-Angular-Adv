import { Hospital, Usuario } from '../interfaces';

export class HospitalModel {

  public nombre: string;
  public _id?: string;
  public img?: string;
  public usuario?: Usuario;


  constructor(hospital: Hospital) {
    this.nombre = hospital.nombre;
    this._id    = hospital._id;
    this.img    = hospital.img;
    this.usuario = hospital.usuario;
  }
}