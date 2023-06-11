import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UsuarioAuthService } from '../../auth/services/usuario-auth.service';
import { FileUploadResponse } from '../interfaces';

const baseUrl = environment.baseUrl;

@Injectable({
  providedIn: 'root',
})
export class FileUploadService {

  private usuarioService = inject(UsuarioAuthService);

  constructor() { }

  async actualizarFoto(archivo: File, tipo: 'usuarios' | 'medicos' | 'hospitales', id: string) {
    try {

      const url = `${baseUrl}/upload/${tipo}/${id}`;
      const formData = new FormData();
      formData.append('imagen', archivo);

      const resp = await fetch(url, {
        method: 'PUT',
        headers: {
          'x-token': this.usuarioService.token || ''
        },
        body: formData
      });

      const data: FileUploadResponse = await resp.json();

      if (data.ok) {
        return data.nombre;
      } else {
        return undefined;
      }
    } catch (error) {
      console.log(error);
      return undefined;
    }
  }
}
