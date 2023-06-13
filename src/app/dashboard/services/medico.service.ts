import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ActualizarCrearMedicoResponse,
  BusquedaMedicoResponse,
  EliminarResponse, Medico, ObtenerMedicoResponse,
  ObtenerMedicosResponse,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {

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

  cargarMedicos(desde: number = 0, limit: number = 0): Observable<ObtenerMedicosResponse> {
    const url    = `${this.baseUrl}/medicos`;
    const params = new HttpParams()
      .set('desde', desde)
      .set('limit', limit);
    return this.http.get<ObtenerMedicosResponse>(url, {
      headers: this.headers,
      params,
    });
  }

  cargarMedico(id: string): Observable<ObtenerMedicoResponse> {
    const url    = `${this.baseUrl}/medicos/${id}`;
    return this.http.get<ObtenerMedicoResponse>(url, {
      headers: this.headers
    });
  }

  crearMedico(formData: Medico): Observable<ActualizarCrearMedicoResponse> {
    const url = `${this.baseUrl}/medicos`;
    return this.http.post<ActualizarCrearMedicoResponse>(url, formData, {
      headers: this.headers,
    });
  }

  actualizarMedico(id: string, formData: Medico): Observable<ActualizarCrearMedicoResponse> {
    const url = `${this.baseUrl}/medicos/${id}`;
    return this.http.put<ActualizarCrearMedicoResponse>(url, formData, {
      headers: this.headers,
    });
  }

  eliminarMedico(id: string): Observable<EliminarResponse> {
    const url = `${this.baseUrl}/medicos/${id}`;
    return this.http.delete<EliminarResponse>(url, {
      headers: this.headers,
    });
  }

  buscarMedicos(termino: string): Observable<BusquedaMedicoResponse> {
    const url = `${this.baseUrl}/todo/coleccion/medicos/${termino}`;
    return this.http.get<BusquedaMedicoResponse>(url, {
      headers: this.headers,
    });
  }
}
