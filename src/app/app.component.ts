import { Component } from '@angular/core';
import { Opcionmenu } from './interfaces/opcionmenu';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  usuario:any;
  
  opciones:Opcionmenu[]=[
    {
    destino:'home',
    icono:'home',
    texto:'Home',
    },
    {
    destino:'login',
    icono:'person',
    texto:'Login',
    },
    {
    destino:'home',
    icono:'qr-code-outline',
    texto:'Escanear codigo QR',
    },
    {
      destino:'login',
      icono:'log-out',
      texto:'Cerrar Sesión',
    }

  ]

  constructor() {
    
  }
}
