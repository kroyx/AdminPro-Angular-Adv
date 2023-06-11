import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from '../../../environments/environment';
import { ObtenerUsuariosResponse } from '../../dashboard/interfaces';
import {
  AuthResponse,
  GoogleSigninResponse,
  LoginForm,
  RegisterForm,
  Usuario,
} from '../interfaces';
import { UsuarioModel } from '../../dashboard/models/usuario.model';


@Injectable({
  providedIn: 'root',
})
export class UsuarioAuthService {

  private http = inject(HttpClient);

  private baseUrl = environment.baseUrl;
  public usuario?: UsuarioModel;

  constructor() { }

  private _googleEmail?: string;

  get googleEmail(): string {
    return this._googleEmail ?? '';
  }

  set googleEmail(email: string) {
    this._googleEmail = email;
  }

  get token(): string {
    return sessionStorage.getItem('token') ?? '';
  }

  get headers() {
    return {
      'x-token': this.token,
    };
  }

  crearUsuario(formData: RegisterForm): Observable<AuthResponse> {
    const url = `${this.baseUrl}/usuarios`;
    return this.http.post<AuthResponse>(url, formData);
  }

  actualizarPerfil(formData: Usuario) {
    formData.role = this.usuario!.role;
    const url     = `${this.baseUrl}/usuarios/${this.usuario!.uid}`;
    return this.http.put<AuthResponse>(url, formData, {
      headers: {
        'x-token': this.token,
      },
    });
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
    const url = `${this.baseUrl}/login/renew`;
    return this.http.get<AuthResponse>(url, {
        headers: {
          'x-token': this.token,
        },
      })
      .pipe(
        map((res) => {
          sessionStorage.setItem('token', res.token!);
          this.usuario = new UsuarioModel(res.usuario!);
          return true;
        }),
        catchError(err => of(false)),
      );
  }

}
