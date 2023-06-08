import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from '../../../environments/environment';
import {
  AuthResponse,
  GoogleSigninResponse,
  LoginForm,
  RegisterForm,
  Usuario,
} from '../interfaces';

@Injectable({
  providedIn: 'root',
})
export class UsuarioService {

  private http = inject(HttpClient);

  private baseUrl = environment.baseUrl;

  private _googleEmail?: string;

  constructor() { }

  get googleEmail(): string {
    return this._googleEmail ?? '';
  }

  set googleEmail(email: string) {
    this._googleEmail = email;
  }

  crearUsuario(formData: RegisterForm): Observable<AuthResponse> {
    const url = `${this.baseUrl}/usuarios`;
    return this.http.post<AuthResponse>(url, formData);
  }

  loginUsuario(formData: LoginForm) {
    const url = `${this.baseUrl}/login`;
    return this.http.post<AuthResponse>(url, formData);
  }

  loginGoogle(token: string): Observable<GoogleSigninResponse> {
    const url: string = `${this.baseUrl}/login/google`;
    return this.http.post<GoogleSigninResponse>(url, { token });
  }

  validarToken(): Observable<boolean> {
    const token = sessionStorage.getItem('token') ?? '';
    const url = `${this.baseUrl}/login/renew`;
    return this.http.get<AuthResponse>(url, {
      headers: {
        'x-token':token
      }
    }).pipe(
      tap( (res) => {
        sessionStorage.setItem('token', res.token!);
      }),
      map( res => true),
      catchError( err => of(false))
    );
  }
}
