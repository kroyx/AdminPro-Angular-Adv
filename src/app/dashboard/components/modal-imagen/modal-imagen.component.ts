import { Component, computed, inject, Signal } from '@angular/core';
import Swal from 'sweetalert2';
import { FileUploadService } from '../../services/file-upload.service';
import { ModalImagenService } from '../../services/modal-imagen.service';

@Component({
  selector: 'modal-imagen',
  templateUrl: './modal-imagen.component.html',
  styleUrls: [ 'modal-imagen.component.css' ],
})
export class ModalImagenComponent {

  private modalImagenService = inject(ModalImagenService);
  private fileUploadService  = inject(FileUploadService);

  public ocultarModal!: Signal<boolean>;
  public img  = computed(() => this.modalImagenService.img());
  public id   = computed(() => this.modalImagenService.id());
  public tipo = computed(() => this.modalImagenService.tipo());

  public imagenSubir?: File;
  public imgTemp: string | ArrayBuffer = '';

  constructor() {
    this.ocultarModal = this.modalImagenService.ocultarModal;
  }

  cerrarModal() {
    this.modalImagenService.cerrarModal();
    this.imgTemp = '';
  }

  cambiarImagen(event: Event) {
    const eventTarget = event.target as HTMLInputElement;
    this.imagenSubir  = eventTarget.files![0];

    if (!this.imagenSubir) {
      this.imgTemp = '';
      return;
    }
    const reader = new FileReader();
    reader.readAsDataURL(this.imagenSubir);

    reader.onloadend = () => {
      this.imgTemp = reader.result ?? '';
    };
  }

  subirImagen() {
    this.fileUploadService
      .actualizarFoto(this.imagenSubir!, this.tipo()!, this.id()!)
      .then(img => {
        Swal.fire('', 'Cambios realizados con éxito', 'success');
        this.modalImagenService.nuevaImagen.set(true);
        this.cerrarModal();
      })
      .catch(err => {
        Swal.fire('Error', err.error.msg, 'error');
      });
  }
}
