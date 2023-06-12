import { Component, effect, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { delay, Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { Entidad } from '../../../interfaces';
import { HospitalModel } from '../../../models';
import { HospitalService } from '../../../services/hospital.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  templateUrl: './hospitales.component.html',
  styleUrls: [ './hospitales.component.css' ],
})
export class HospitalesComponent implements OnInit {

  private hospitalService    = inject(HospitalService);
  private modalImagenService = inject(ModalImagenService);

  private debounceTimer?: NodeJS.Timeout;
  private nuevaImagenSub!: Subscription;

  @ViewChild('txtBuscar') inputBuscar?: ElementRef<HTMLInputElement>;

  public hospitales: HospitalModel[] = [];
  public totalHospitales: number     = 0;
  public desde: number               = 0;
  public limit: number               = 5;
  public cargandoHospitales: boolean = true;
  public mostrarBotones: boolean     = true;

  constructor() {}

  ngOnInit(): void {
    this.cargarHospitales();
    this.nuevaImagenSub = this.modalImagenService.nuevaImagen
      .pipe(
        delay(100),
      )
      .subscribe(() => this.cargarHospitales());
  }

  cargarHospitales() {
    this.cargandoHospitales = true;
    this.hospitalService.cargarHospitales(this.desde, this.limit)
      .subscribe({
        next: ({ total, hospitales }) => {
          this.hospitales      = hospitales ?? [];
          // this.totalHospitales = total ?? 0;
          this.totalHospitales = this.hospitales.length;
        },
        complete: () => {
          this.cargandoHospitales = false;
          this.mostrarBotones     = true;
        },
      });
  }

  buscar(termino: string) {
    if (this.debounceTimer) clearTimeout(this.debounceTimer);

    this.debounceTimer = setTimeout(() => {
      this.cargandoHospitales = true;

      if (!termino) {
        this.cargarHospitales();
        return;
      }

      this.hospitalService.buscarHospitales(termino)
        .subscribe({
          next: resp => {
            this.hospitales      = resp.resultados ?? [];
            this.totalHospitales = this.hospitales.length;
          },
          complete: () => {
            this.cargandoHospitales = false;
            this.mostrarBotones     = false;
          },
        });
    }, 1000);
  }

  limpiarBuscador() {
    if (!this.inputBuscar) return;
    if (!this.inputBuscar.nativeElement.value) return;

    this.inputBuscar.nativeElement.value = '';

    if (this.debounceTimer) clearTimeout(this.debounceTimer);
    this.cargarHospitales();
  }

  cambiarPagina(valor: number) {
    const newDesde = this.desde + valor;
    if (newDesde < 0) {
      return;
    } else if (newDesde >= this.totalHospitales) {
      return;
    }

    this.desde = newDesde;
    this.cargarHospitales();
  }

  async crearHospital() {
    const { value } = await Swal.fire<string>({
      title: 'Crear hospital',
      input: 'text',
      inputLabel: 'Nombre',
      inputPlaceholder: 'Introduzca el nombre del hospital',
      showConfirmButton: true,
      showCancelButton: true,
      inputValidator: (inputValue) => {
        return new Promise((resolve) => {
          if (!inputValue) {
            resolve('El nombre es obligatorio');
          } else {
            resolve('');
          }
        });
      },
    });

    if (value?.trim()) {
      this.hospitalService.crearHospital(value)
        .subscribe({
          next: resp => {
            this.cargarHospitales();
            Swal.fire('Operación realizada', 'Se ha creado el hospital con éxito', 'success');
          },
          error: err => {
            Swal.fire('Error', err.error.msg, 'error');
          },
        });
    }
  }

  actualizarHospital(hospital: HospitalModel) {
    this.hospitalService.actualizarHospital(hospital._id!, hospital.nombre)
      .subscribe({
        next: resp => {
          Swal.fire('Actualizado', resp.msg, 'success');
        },
        error: err => {
          Swal.fire('Error', err.error.msg, 'error');
        },
      });
  }

  borrarHospital(hospital: HospitalModel) {
    console.log(hospital);
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
          this.hospitalService.eliminarHospital(hospital._id!)
            .subscribe({
              next: resp => {
                this.cargarHospitales();
                Swal.fire(
                  'Eliminado!',
                  `El hospital ${hospital.nombre} ha sido eliminado con éxito`,
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

  abrirModal(hospital: HospitalModel) {
    this.modalImagenService.abrirModal(Entidad.hospitales, hospital._id!, hospital.img);
  }
}
