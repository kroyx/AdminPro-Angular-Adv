import { Component, inject, OnInit } from '@angular/core';
import { UsuarioModel } from '../../../auth/models/usuario.model';
import { UsuarioService } from '../../../auth/services/usuario.service';

@Component({
  templateUrl: './usuarios.component.html',
  styleUrls: [ './usuarios.component.css' ],
})
export class UsuariosComponent implements OnInit {

  private usuarioService = inject(UsuarioService);

  public usuarios: UsuarioModel[] = [];
  public totalUsuarios: number    = 0;
  public desde: number            = 0;
  public limit: number = 5;
  public cargandoUsuarios: boolean = true;
  // public mostrarBotonSiguientes: boolean = true;
  // public mostrarBotonAnteriores: boolean = false;

  ngOnInit(): void {
    this.cargarUsuarios();
  }

  cargarUsuarios() {
    this.cargandoUsuarios = true;
    this.usuarioService.cargarUsuarios(this.desde, this.limit)
      .subscribe({
        next: ({ total, usuarios }) => {
          this.totalUsuarios = total ?? 0;
          this.usuarios      = usuarios ?? [];
        },
        complete: () => this.cargandoUsuarios = false
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
}
