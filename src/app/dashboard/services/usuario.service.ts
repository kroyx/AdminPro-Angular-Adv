import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BusquedaResponse, EliminarResponse, ObtenerUsuariosResponse } from '../interfaces';
import { ActualizarUsuarioResponse } from '../interfaces/actualizar-usuario-response.interface';
import { UsuarioModel } from '../models/usuario.model';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private http = inject(HttpClient);

  private baseUrl = environment.baseUrl;

  constructor() { }

  get token(): string {
    return sessionStorage.getItem('token') ?? '';
  }

  get headers() {
    return {
      'x-token': this.token,
    };
  }

  cargarUsuarios(desde: number = 0, limit: number = 5): Observable<ObtenerUsuariosResponse> {
    const url    = `${this.baseUrl}/usuarios`;
    const params = new HttpParams()
      .set('desde', desde)
      .set('limit', limit);
    return this.http.get<ObtenerUsuariosResponse>(url, {
        headers: this.headers,
        params,
      })
      .pipe(
        map(resp => {
          const usuarios = resp.usuarios?.map(user => new UsuarioModel(user));
          resp.usuarios  = usuarios;
          return resp;
        }),
      );
  }

  buscarUsuarios(termino: string): Observable<BusquedaResponse> {
    const url = `${this.baseUrl}/todo/coleccion/usuarios/${termino}`;
    return this.http.get<BusquedaResponse>(url, {
        headers: this.headers,
      })
      .pipe(
        map(resp => {
          const usuarios  = resp.resultados?.map(user => new UsuarioModel(user));
          resp.resultados = usuarios;
          return resp;
        }),
      );
  }

  actualizarUsuario(usuario: UsuarioModel): Observable<ActualizarUsuarioResponse> {
    const url = `${this.baseUrl}/usuarios/${usuario.uid}`;
    return this.http.put<ActualizarUsuarioResponse>(url, usuario, {
      headers: this.headers,
    });
  }

  eliminarUsuario(id: string): Observable<EliminarResponse> {
    const url = `${this.baseUrl}/usuarios/${id}`;
    return this.http.delete<EliminarResponse>(url, {
      headers: this.headers,
    });
  }
}
