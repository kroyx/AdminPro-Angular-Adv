import { computed, EventEmitter, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Entidad } from '../interfaces';

const base_url = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class ModalImagenService {

  private _ocultarModal = signal<boolean>(true);
  public ocultarModal = computed(() => this._ocultarModal());

  public img = signal<string | null>(null);
  public id = signal<string | null>(null);
  public tipo = signal<Entidad | null>(null);
  // public nuevaImagen = signal<boolean>(false);
  public nuevaImagen: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  abrirModal(tipo: Entidad, id: string, img: string = 'no-img') {
    this._ocultarModal.set(false);

    this.tipo.set(tipo)
    this.id.set(id);
    if (img.includes('https')) {
      this.img.set(img);
    } else {
      this.img.set(`${base_url}/upload/${tipo}/${img}`);
    }
  }

  cerrarModal() {
    this._ocultarModal.set(true);
    this.img.set(null);
    this.id.set(null);
    this.tipo.set(null);
  }
}
