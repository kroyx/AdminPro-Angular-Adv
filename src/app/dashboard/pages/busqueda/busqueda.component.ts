import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap } from 'rxjs';
import { Hospital, Medico, Usuario } from '../../interfaces';
import { BusquedasService } from '../../services/busquedas.service';

@Component({
  templateUrl: './busqueda.component.html',
  styleUrls: [ './busqueda.component.css' ],
})
export class BusquedaComponent implements OnInit {

  private router          = inject(Router);
  private activatedRoute  = inject(ActivatedRoute);
  private busquedaService = inject(BusquedasService);

  public usuarios: Usuario[]    = [];
  public hospitales: Hospital[] = [];
  public medicos: Medico[]      = [];

  ngOnInit(): void {
    this.busquedaGlobal();
  }

  busquedaGlobal() {
    this.activatedRoute.params
      .pipe(
        filter(({ termino }) => !!termino),
        switchMap(({ termino }) => this.busquedaService.busquedaGlobal(termino)),
      )
      .subscribe(resp => {
        this.usuarios = resp.usuarios ?? [];
        this.hospitales = resp.hospitales ?? [];
        this.medicos = resp.medicos ?? [];
      });
  }
}
