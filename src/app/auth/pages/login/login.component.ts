import { AfterViewInit, Component, ElementRef, inject, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { environment } from '../../../../environments/environment';
import { UsuarioAuthService } from '../../services/usuario-auth.service';

declare const google: any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [
    './login.component.css',
  ],
})
export class LoginComponent implements AfterViewInit {

  private router         = inject(Router);
  private fb             = inject(FormBuilder);
  private usuarioService = inject(UsuarioAuthService);

  private rememberedUser = localStorage.getItem('email') ?? '';

  @ViewChild('googleBtn') googleBtn?: ElementRef<HTMLElement>;

  public loginForm: FormGroup = this.fb.group({
    email: [ this.rememberedUser, [ Validators.required, Validators.email ] ],
    password: [ '', Validators.required ],
    remember: [ false ],
  });

  ngAfterViewInit(): void {
    this.googleInit();
  }

  googleInit() {
    google.accounts.id.initialize({
      client_id: environment.googleId,
      callback: (response: any) => this.handleCredentialResponse(response),
    });
    google.accounts.id.renderButton(
      this.googleBtn!.nativeElement,
      { theme: "outline", size: "large" },  // customization attributes
    );
  }

  handleCredentialResponse(response: any) {
    this.usuarioService.loginGoogle(response.credential)
      .subscribe(res => {
        sessionStorage.setItem('token', res.token!);
        this.usuarioService.googleEmail = res.email!;
        this.router.navigateByUrl('/dashboard');
      });
  }

  isInvalidField(field: string): boolean | null {
    return this.loginForm.controls[field].errors
      && this.loginForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {
    if (!this.loginForm.controls[field]) return null;

    const errors = this.loginForm.controls[field].errors || {};
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return 'Este campo es requerido';
        case 'minlength':
          return `Mínimo ${errors['minlength'].requiredLength} caracteres.`;
        case 'email':
          return 'Debe ser un email con un formato válido';
        case 'notEqual':
          return 'Las contraseñas deben de ser iguales';
      }
    }
    return null;
  }

  login(): void {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }
    console.log('login');

    this.usuarioService.loginUsuario(this.loginForm.value)
      .subscribe({
        next: resp => {
          sessionStorage.setItem('token', resp.token!);

          if (this.loginForm.get('remember')!.value) {
            localStorage.setItem('email', this.loginForm.get('email')!.value);
          } else {
            localStorage.removeItem('email');
          }
          this.router.navigateByUrl('/dashboard');
        },
        error: err => Swal.fire('Error', err.error.msg, 'error'),
      });
  }
}
