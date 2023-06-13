import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { BusquedaResponse } from '../interfaces';

@Injectable({
  providedIn: 'root'
})
export class BusquedasService {

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

  busquedaGlobal(termino: string): Observable<BusquedaResponse> {
    const url = `${this.baseUrl}/todo/${termino}`;
    return this.http.get<BusquedaResponse>(url, {
      headers: this.headers
    });
  }
}
