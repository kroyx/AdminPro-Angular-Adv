import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UsuarioModel } from '../../../auth/models/usuario.model';
import { UsuarioService } from '../../../auth/services/usuario.service';
import { FileUploadService } from '../../services/file-upload.service';

@Component({
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.css']
})
export class PerfilComponent implements OnInit {

  private fb             = inject(FormBuilder);
  private usuarioService = inject(UsuarioService);
  private fileUploadService = inject(FileUploadService);

  public usuario!: UsuarioModel;
  public perfilForm!: FormGroup;
  public imagenSubir?: File;
  public imgTemp: string | ArrayBuffer = '';

  constructor() {
    this.usuario = this.usuarioService.usuario!;
  }

  ngOnInit(): void {
    this.perfilForm = this.fb.group({
      nombre: [ this.usuario.nombre, [ Validators.required ] ],
      email: [ this.usuario.email, [ Validators.required, Validators.email ] ],
    });
  }

  actualizarPerfil() {
    if (this.perfilForm.invalid) {
      this.perfilForm.markAllAsTouched();
      return;
    }
    this.usuarioService.actualizarPerfil(this.perfilForm.value)
      .subscribe({
        next: resp => {
          this.usuario.nombre = resp.usuario!.nombre;
          this.usuario.email = resp.usuario!.email;
          Swal.fire('', 'Cambios realizados con éxito', 'success')
        },
        error: err => Swal.fire('Error', err.error.msg, 'error'),
      })
  }

  cambiarImagen(event: Event) {
    const eventTarget = event.target as HTMLInputElement;
    this.imagenSubir = eventTarget.files![0];

    if (!this.imagenSubir) {
      this.imgTemp = '';
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.imagenSubir);

    reader.onloadend = () => {
      this.imgTemp = reader.result ?? '';
    }
  }

  subirImagen() {
    this.fileUploadService
      .actualizarFoto(this.imagenSubir!, 'usuarios', this.usuario.uid!)
      .then(img => {
        this.usuario.img = img;
        Swal.fire('', 'Cambios realizados con éxito', 'success');
      })
      .catch( err => {
        Swal.fire('Error', err.error.msg, 'error');
      })
  }
}
