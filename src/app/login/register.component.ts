import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert';
import { UsuarioService } from '../services/service.index';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';


declare function init_plugin();

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./login.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;

  constructor(
    public _usuarioService: UsuarioService
    , public router: Router
  ) { }

  ngOnInit() {
    init_plugin();
    this.forma = new FormGroup({
      nombre: new FormControl(null, [Validators.required, Validators.minLength(4)]),
      correo: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, [Validators.required]),
      password2: new FormControl(null, [Validators.required]),
      condiciones: new FormControl(false)
    }, {validators: this.sonIguales('password', 'password2')} );
    this.forma.setValue({
      nombre: 'test'
      , correo: 'test@test.com'
      , password: '123456'
      , password2: '123456'
      , condiciones: true
    });
  }

  sonIguales(eval1: string, eval2: string) {
    return ( group: FormGroup) => {
      const pswd1 = group.controls[eval1].value;
      const pswd2 = group.controls[eval2].value;
      if (pswd1 === pswd2) {
        return null;
      }
      return {
        sonIguales: true
      };
    };
  }

  registrarUsuario() {
    console.log('Form', this.forma.invalid);
    if (this.forma.invalid) {
      return;
    }
    if (!this.forma.value.condiciones) {
      swal('Importante', 'Debe de aceptar las condiciones', 'warning');
      return;
    }
    const usuario = new Usuario(this.forma.value.nombre, this.forma.value.correo, this.forma.value.password);
    this._usuarioService.crearUsuario(usuario)
      .subscribe(resp => this.router.navigate(['/login']));
  }

}
