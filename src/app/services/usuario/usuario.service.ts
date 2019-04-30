import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVER } from '../../config/config';

import { map } from 'rxjs/operators';
import swal from 'sweetalert';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario: Usuario;
  token: string;

  constructor(
    public http: HttpClient
    , public router: Router
  ) {
    this.cargarStorage();
  }

  estaLogueado() {
    return this.token.length > 5 ? true : false;
  }

  guardarStorage(id: string, token: string, usuario: Usuario) {
    localStorage.setItem('id', id);
    localStorage.setItem('token', token);
    localStorage.setItem('usuario', JSON.stringify(usuario));
    this.usuario = usuario;
    this.token = token;
  }

  cargarStorage() {
    if (localStorage.getItem('token')) {
      this.token = localStorage.getItem('token');
      this.usuario = JSON.parse(localStorage.getItem('usuario'));
    } else {
      this.token = '';
      this.usuario = null;
    }
  }

  loginGoogle(token: string) {
    const url = URL_SERVER + '/login/google';
    return this.http.post(url, {token}).pipe(
      map( (resp: any) => {
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
    }));
  }

  login(usuario: Usuario, recordar: boolean) {
    if (recordar) {
      localStorage.setItem('email', usuario.email);
    } else {
      localStorage.removeItem('email');
    }
    const url = URL_SERVER + '/login';
    return this.http.post(url, usuario).pipe(
      map( (resp: any) => {
        // localStorage.setItem('id', resp.id);
        // localStorage.setItem('token', resp.token);
        // localStorage.setItem('usuario', JSON.stringify(resp.usuario));
        this.guardarStorage(resp.id, resp.token, resp.usuario);
        return true;
    }));
  }

  logout() {
    this.usuario = null;
    this.token = '';
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    this.router.navigate(['/login']);
  }

  crearUsuario(usuario: Usuario) {
    const url = URL_SERVER + '/usuario';
    return this.http.post(url, usuario).pipe(
      map( (resp: any) => {
        swal('Usuario Creado', resp.usuario.email, 'success');
        return resp.usuario;
    }));
  }
}
