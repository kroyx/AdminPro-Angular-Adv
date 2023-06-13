import { Component, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AuthResponse } from '../../interfaces';
import { UsuarioAuthService } from '../../services/usuario-auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: [
    './register.component.css',
  ],
})
export class RegisterComponent {

  private router         = inject(Router);
  private fb             = inject(FormBuilder);
  private usuarioService = inject(UsuarioAuthService);

  public registerForm: FormGroup = this.fb.group({
    nombre: [ 'Samuel', Validators.required ],
    email: [ 'samuel1@gmail.com', [ Validators.required, Validators.email ] ],
    password: [ '123456', Validators.required ],
    password2: [ '123456', Validators.required ],
    terminos: [ true, [ Validators.requiredTrue ] ],
  }, {
    validators: [
      this.isFieldOneEqualFieldTwo('password', 'password2'),
    ],
  });

  isInvalidField(field: string): boolean | null {
    return this.registerForm.controls[field].errors
      && this.registerForm.controls[field].touched;
  }

  getFieldError(field: string): string | null {
    if (!this.registerForm.controls[field]) return null;

    const errors = this.registerForm.controls[field].errors || {};
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

  public isFieldOneEqualFieldTwo(field1: string, field2: string) {
    return (formGroup: AbstractControl): ValidationErrors | null => {
      const fieldValue1 = formGroup.get(field1)?.value;
      const fieldValue2 = formGroup.get(field2)?.value;

      if (fieldValue1 !== fieldValue2) {
        formGroup.get(field2)
          ?.setErrors({ notEqual: true });
        return { notEqual: true };
      }

      // formGroup.get(field2)
      //   ?.setErrors(null);
      return null;
    };
  }

  crearUsuario() {
    if (this.registerForm.invalid) {
      this.registerForm.markAllAsTouched();
      return;
    }

    this.usuarioService.crearUsuario(this.registerForm.value)
      .subscribe({
        next: (res: AuthResponse) => {
          sessionStorage.setItem('token', res.token!);
          sessionStorage.setItem('menu', JSON.stringify(res.menu!));
          this.router.navigateByUrl('/dashboard');
        },
        error: ({ error }) => {
          console.log(error);
          Swal.fire('Error', error.msg, 'error');
        },
      });
  }
}
