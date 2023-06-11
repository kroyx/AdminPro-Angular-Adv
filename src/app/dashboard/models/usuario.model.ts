import { environment } from '../../../environments/environment';
import { Usuario } from '../../auth/interfaces';

const baseUrl = environment.baseUrl;

export class UsuarioModel {

  public nombre: string;
  public email: string;
  public password?: string;
  public img?: string;
  public google?: boolean;
  public role?: string;
  public uid?: string;



  constructor(usuario: Usuario) {
    this.nombre = usuario.nombre;
    this.email = usuario.email;
    this.password = usuario.password;
    this.img = usuario.img;
    this.google = usuario.google;
    this.role = usuario.role;
    this.uid = usuario.uid;
  }

  get imagenUrl() {

    if (this.img?.includes('https')) {
      return this.img;
    }

    if (this.img) {
      return `${baseUrl}/upload/usuarios/${this.img}`;
    } else {
      return `${baseUrl}/upload/usuarios/no-image`;
    }
  }
}