import { Pipe, PipeTransform } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Entidad } from '../interfaces';

@Pipe({
  name: 'imagen',
})
export class ImagenPipe implements PipeTransform {

  private baseUrl = environment.baseUrl;

  transform(img: string | undefined, tipo: 'usuarios' | 'hospitales' | 'medicos'): string {
    if (!img) {
      return `${(this.baseUrl)}/upload/${tipo}/no-image`;
    } else if (img.includes('https')) {
      return img;
    } else if (img) {
      return `${(this.baseUrl)}/upload/${tipo}/${img}`;
    } else {
      return `${(this.baseUrl)}/upload/${tipo}/no-image`;
    }
  }
}
