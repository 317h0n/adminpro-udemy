import { Component, OnInit, Input, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-incrementador',
  templateUrl: './incrementador.component.html',
  styleUrls: ['./incrementador.component.css']
})
export class IncrementadorComponent implements OnInit {

  @ViewChild('txtProgress') txtProgress: ElementRef;
  @Input('nombre') leyenda = 'Leyenda';
  @Input() progreso: number;
  @Output() cambioValor: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.progreso = 50;
  }

  ngOnInit() {
  }

  cambiarValor(valor: number) {
    if ((this.progreso + valor) < 0) {
      this.progreso = 0;
    } else if ((this.progreso + valor) > 100) {
      this.progreso = 100;
    } else {
      this.progreso += valor;
    }
    this.cambioValor.emit(this.progreso);
    this.txtProgress.nativeElement.focus();
  }

  onTextChange(valor: number) {
    // const elemHTML: any = document.getElementsByName('progreso')[0];
    if (valor > 100) {
      this.progreso = 100;
    } else if (valor < 0) {
      this.progreso = 0;
    } else {
      this.progreso = valor;
    }
    // elemHTML.value = this.progreso;
    this.txtProgress.nativeElement.value = this.progreso;
    this.cambioValor.emit(this.progreso);
  }

}
