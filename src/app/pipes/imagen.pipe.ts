import { Pipe, PipeTransform } from '@angular/core';
import { URL_SERVER } from '../config/config';

@Pipe({
  name: 'imagen'
})
export class ImagenPipe implements PipeTransform {

  transform(img: string, tipo: string = 'usuarios'): any {
    const url = URL_SERVER + '/img/' + tipo;
    if (!img) {
      return url + 'usuarios/xxxx';
    }
    if (img.indexOf('https') >= 0) {
      return img;
    }
    img = url + '/' + img;
    return img;
  }

}
