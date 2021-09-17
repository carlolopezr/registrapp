import { Component } from '@angular/core';
import { Opcionmenu } from './interfaces/opcionmenu';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  opciones:Opcionmenu[]=[
    {
    destino:'home',
    icono:'home',
    texto:'home',
    },
    {
    destino:'login',
    icono:'person',
    texto:'Login',
    },
    {
    destino:'codigoqr',
    icono:'chatbubble',
    texto:'Escanear codigo QR',
    }
  ]
  constructor() {}
}
