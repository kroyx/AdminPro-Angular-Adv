import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  ActualizarCrearHospitalResponse,
  BusquedaHospitalResponse,
  EliminarResponse,
  ObtenerHospitalesResponse,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class HospitalService {

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

  cargarHospitales(desde: number = 0, limit: number = 0): Observable<ObtenerHospitalesResponse> {
    const url    = `${this.baseUrl}/hospitales`;
    const params = new HttpParams()
      .set('desde', desde)
      .set('limit', limit);
    return this.http.get<ObtenerHospitalesResponse>(url, {
      headers: this.headers,
      params,
    });
  }

  crearHospital(nombre: string): Observable<ActualizarCrearHospitalResponse> {
    const url = `${this.baseUrl}/hospitales`;
    return this.http.post<ActualizarCrearHospitalResponse>(url, { nombre }, {
      headers: this.headers,
    });
  }

  actualizarHospital(id: string, nombre: string): Observable<ActualizarCrearHospitalResponse> {
    const url = `${this.baseUrl}/hospitales/${id}`;
    return this.http.put<ActualizarCrearHospitalResponse>(url, { nombre }, {
      headers: this.headers,
    });
  }

  eliminarHospital(id: string): Observable<EliminarResponse> {
    const url = `${this.baseUrl}/hospitales/${id}`;
    return this.http.delete<EliminarResponse>(url, {
      headers: this.headers,
    });
  }

  buscarHospitales(termino: string): Observable<BusquedaHospitalResponse> {
    const url = `${this.baseUrl}/todo/coleccion/hospitales/${termino}`;
    return this.http.get<BusquedaHospitalResponse>(url, {
      headers: this.headers,
    });
  }
}
