import { Component, ElementRef, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Entidad } from '../../../interfaces';
import { MedicoModel } from '../../../models';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  templateUrl: './medicos.component.html',
  styleUrls: [ './medicos.component.css' ],
})
export class MedicosComponent implements OnInit, OnDestroy{

  private medicoService      = inject(MedicoService);
  private modalImagenService = inject(ModalImagenService);

  private debounceTimer?: NodeJS.Timeout;
  private nuevaImagenSub!: Subscription;

  @ViewChild('txtBuscar') inputBuscar?: ElementRef<HTMLInputElement>;

  public medicos: MedicoModel[]   = [];
  public totalMedicos: number     = 0;
  public desde: number            = 0;
  public limit: number            = 5;
  public cargandoMedicos: boolean = true;
  public mostrarBotones: boolean  = true;

  ngOnInit(): void {
    this.cargarMedicos();
    this.nuevaImagenSub = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100),
      )
      .subscribe(() => this.cargarMedicos());
  }

  ngOnDestroy(): void {
    this.nuevaImagenSub.unsubscribe();
  }


  cargarMedicos() {
    this.cargandoMedicos = true;
    this.medicoService.cargarMedicos(this.desde, this.limit)
      .subscribe({
        next: ({ total, medicos }) => {
          this.medicos      = medicos ?? [];
          // this.totalHospitales = total ?? 0;
          this.totalMedicos = this.medicos.length;
        },
        complete: () => {
          this.cargandoMedicos = false;
          this.mostrarBotones  = true;
        },
      });
  }

  cambiarPagina(valor: number) {
    const newDesde = this.desde + valor;
    if (newDesde < 0) {
      return;
    } else if (newDesde >= this.totalMedicos) {
      return;
    }

    this.desde = newDesde;
    this.cargarMedicos();
  }

  buscar(termino: string) {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      this.cargandoMedicos = true;

      if (!termino) {
        this.cargarMedicos();
        return;
      }

      this.medicoService.buscarMedicos(termino)
        .subscribe({
          next: resp => {
            this.medicos      = resp.resultados ?? [];
            this.totalMedicos = this.medicos.length;
          },
          complete: () => {
            this.cargandoMedicos = false;
            this.mostrarBotones  = false;
          },
        });
    }, 1000);
  }

  limpiarBuscador() {
    if (!this.inputBuscar) return;
    if (!this.inputBuscar.nativeElement.value) return;

    this.inputBuscar.nativeElement.value = '';

    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.cargarMedicos();
  }

  borrarMedico(medico: MedicoModel) {
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
          this.medicoService.eliminarMedico(medico._id!)
            .subscribe({
              next: resp => {
                this.cargarMedicos();
                Swal.fire(
                  'Eliminado!',
                  `El medico ${medico.nombre} ha sido eliminado con éxito`,
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

  abrirModal(medico: MedicoModel) {
    this.modalImagenService.abrirModal(Entidad.medicos, medico._id!, medico.img);
  }
}
