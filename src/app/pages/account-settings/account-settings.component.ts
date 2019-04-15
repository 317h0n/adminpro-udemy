import { Component, OnInit, Inject } from '@angular/core';
import { SettingsService } from '../../services/service.index';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: []
})
export class AccountSettingsComponent implements OnInit {

  constructor(private _ss: SettingsService) { }

  ngOnInit() {
    this.colocarCheck();
  }

  cambiarColor(color: string, link: any) {
    this._ss.aplicarTema(color);
    this.aplicarCheck(link);
  }

  aplicarCheck(link: any) {
    const selector: any = document.getElementsByClassName('selector');
    for (const ref of selector) {
      ref.classList.remove('working');
    }
    link.classList.add('working');
  }

  colocarCheck() {
    const tema = this._ss.ajustes.tema;
    const selector: any = document.getElementsByClassName('selector');
    for (const ref of selector) {
      if (ref.getAttribute('data-theme') === tema) {
        ref.classList.add('working');
      } else {
        ref.classList.remove('working');
      }
    }
  }

}
