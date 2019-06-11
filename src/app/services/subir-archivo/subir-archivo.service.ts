import { Injectable } from '@angular/core';
import { resolve, reject } from 'q';
import { URL_SERVER } from '../../config/config';

@Injectable({
  providedIn: 'root'
})
export class SubirArchivoService {

  constructor() { }

  subirArchivo(archivo: File, tipo: string, id: string) {
    // tslint:disable-next-line:no-shadowed-variable
    return new Promise((resolve, reject) => {
      const formData = new FormData();
      const xhr = new XMLHttpRequest();
      formData.append('imagen', archivo, archivo.name);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Imagen subida');
            resolve(JSON.parse(xhr.response));
          } else {
            console.log('Fallo subida');
            reject(JSON.parse(xhr.response));
          }
        }
      };
      const url = URL_SERVER + '/upload/' + tipo + '/' + id;
      console.log(url);
      xhr.open('PUT', url, true);
      xhr.send(formData);
    });
  }
}
