import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { UsuarioAuthService } from '../../../../auth/services/usuario-auth.service';
import { Entidad } from '../../../interfaces';
import { UsuarioModel } from '../../../models/usuario.model';
import { ModalImagenService } from '../../../services/modal-imagen.service';
import { UsuarioService } from '../../../services/usuario.service';

@Component({
  templateUrl: './usuarios.component.html',
  styleUrls: [ './usuarios.component.css' ],
})
export class UsuariosComponent implements OnInit, OnDestroy {

  private usuarioService     = inject(UsuarioService);
  private usuarioAuthService = inject(UsuarioAuthService);
  private modalImagenService = inject(ModalImagenService);

  private debounceTimer?: NodeJS.Timeout;
  private nuevaImagenSub!: Subscription;

  @ViewChild('txtBuscar') inputBuscar?: ElementRef<HTMLInputElement>;

  public usuarios: UsuarioModel[]  = [];
  public totalUsuarios: number     = 0;
  public desde: number             = 0;
  public limit: number             = 5;
  public cargandoUsuarios: boolean = true;
  public mostrarBotones: boolean   = true;

  public usuarioActualId!: string;

  ngOnInit(): void {
    this.usuarioActualId = this.usuarioAuthService.usuario?.uid ?? '';
    this.cargarUsuarios();
    this.nuevaImagenSub = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100),
      )
      .subscribe(() => this.cargarUsuarios());
  }

  ngOnDestroy(): void {
    this.nuevaImagenSub.unsubscribe();
  }

  cargarUsuarios() {
    this.cargandoUsuarios = true;
    this.usuarioService.cargarUsuarios(this.desde, this.limit)
      .subscribe({
        next: ({ total, usuarios }) => {
          this.totalUsuarios = total ?? 0;
          this.usuarios      = usuarios ?? [];
        },
        complete: () => {
          this.cargandoUsuarios = false;
          this.mostrarBotones   = true;
        },
      });
  }

  cambiarPagina(valor: number) {
    const newDesde = this.desde + valor;
    if (newDesde < 0) {
      return;
    } else if (newDesde >= this.totalUsuarios) {
      return;
    }

    this.desde = newDesde;
    this.cargarUsuarios();
  }

  buscar(termino: string) {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      this.cargandoUsuarios = true;

      if (!termino) {
        this.cargarUsuarios();
        return;
      }

      this.usuarioService.buscarUsuarios(termino)
        .subscribe({
          next: resp => {
            this.totalUsuarios = resp.resultados?.length ?? 0;
            this.usuarios      = resp.resultados ?? [];
          },
          complete: () => {
            this.cargandoUsuarios = false;
            this.mostrarBotones   = false;
          },
        });
    }, 1000);
  }

  limpiarBuscador() {
    if (!this.inputBuscar) return;
    if (!this.inputBuscar.nativeElement.value) return;

    this.inputBuscar.nativeElement.value = '';

    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.cargarUsuarios();
  }

  borrarUsuario(usuario: UsuarioModel) {

    if (usuario.uid === this.usuarioActualId) {
      Swal.fire(
        'Error',
        'No se puede eliminar a sí mismo',
        'error',
      );
      return;
    }

    Swal.fire({
        title: '¿Estás seguro?',
        text: "No se podrá revertir la acción",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
      })
      .then((result) => {
        if (result.value) {
          this.usuarioService.eliminarUsuario(usuario.uid!)
            .subscribe({
              next: resp => {
                this.cargarUsuarios();
                Swal.fire(
                  'Eliminado!',
                  `El usuario ${usuario.nombre} ha sido eliminado con éxito`,
                  'success',
                );
              },
              error: err => {
                Swal.fire(
                  'Error',
                  err.error.msg,
                  'error',
                );
              },
            });
        }
      });
  }

  cambiarRol(usuario: UsuarioModel) {
    this.usuarioService.actualizarUsuario(usuario)
      .subscribe({
        error: err => {
          Swal.fire(
            'Error',
            err.error.msg,
            'error',
          );
        },
      });
  }

  abrirModal(usuario: UsuarioModel) {
    this.modalImagenService.abrirModal(Entidad.usuarios, usuario.uid!, usuario.img);
  }
}
