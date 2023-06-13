import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, delay, filter, Observable, of, switchMap } from 'rxjs';
import Swal from 'sweetalert2';
import { ActualizarCrearMedicoResponse, Hospital, Medico } from '../../../interfaces';
import { HospitalService } from '../../../services/hospital.service';
import { MedicoService } from '../../../services/medico.service';
import { ModalImagenService } from '../../../services/modal-imagen.service';

@Component({
  templateUrl: './medico.component.html',
  styleUrls: [ './medico.component.css' ],
})
export class MedicoComponent implements OnInit {

  private fb             = inject(FormBuilder);
  private router         = inject(Router);
  private activatedRoute = inject(ActivatedRoute);

  private medicoService      = inject(MedicoService);
  private hospitalService    = inject(HospitalService);
  private modalImagenService = inject(ModalImagenService);

  public medicoForm!: FormGroup;
  public medicoSeleccionado?: Medico;
  public hospitales?: Hospital[];
  public hospitalSeleccionado?: Hospital;

  constructor() {}

  ngOnInit(): void {

    // Se carga la lista de hospitales para el selector
    this.cargarHospitales();

    this.cargarMedico();

    // Se inicializa el formulario
    this.medicoForm = this.fb.group({
      nombre: [ '', [ Validators.required ] ],
      hospital: [ '', [ Validators.required ] ],
    });

    this.medicoForm.get('hospital')
      ?.valueChanges
      .subscribe(hospitalId => {
        this.hospitalSeleccionado = this.hospitales?.find(hospital => hospital._id === hospitalId);
      });
  }

  cargarMedico() {
    // Se comprueba si se está actualizando un medico o creando uno
    this.activatedRoute.params
      .pipe(
        // delay(200),
        filter(({ id }) => !!id),
        filter(({ id }) => id !== 'nuevo'),
        switchMap(({ id }) => this.medicoService.cargarMedico(id)),
        filter(resp => !!resp.medico),
        catchError(err => of(undefined)),
      )
      .subscribe(resp => {
        if (!resp) {
          this.router.navigateByUrl('/dashboard/medicos');
          return;
        }
        const medico            = resp!.medico;
        const hospital          = medico!.hospital?._id ?? '';
        const nombre            = medico!.nombre;
        this.medicoSeleccionado = medico;
        this.medicoForm.setValue({ nombre, hospital });
        this.hospitalSeleccionado = this.hospitales?.find(h => h._id === hospital);
      });
  }

  guardarCambios() {
    if (this.medicoForm.invalid) {
      return;
    }

    let operacion!: Observable<ActualizarCrearMedicoResponse>;
    let text: string;

    if (this.medicoSeleccionado) {
      operacion = this.medicoService.actualizarMedico(this.medicoSeleccionado!._id!,
        this.medicoForm.value);
      text      = 'El medico ha sido creado con éxito';
    } else {
      operacion = this.medicoService.crearMedico(this.medicoForm.value);
      text      = 'El médico ha sido actualizado correctamente';
    }

    operacion.subscribe({
      next: resp => {
        Swal.fire({
          title: 'Operación realizada',
          icon: 'success',
          text,
          timer: 2000,
          timerProgressBar: true,
          willClose: () => {
            // this.router.navigateByUrl('/dashboard/medicos');
            this.router.navigateByUrl(`/dashboard/medico/${resp.medico?._id}`);
          },
        });
      },
      error: err => {
        Swal.fire('Error', err.error.msg, 'error');
      },
    });
  }

  cargarHospitales() {
    this.hospitalService.cargarHospitales()
      .subscribe({
        next: ({ hospitales }) => {
          this.hospitales = hospitales;
        },
      });
  }

  volver() {
    this.router.navigateByUrl('dashboard/medicos');
  }
}
