import { Component } from '@angular/core';
import { Opcionmenu, Usuario } from './interfaces/opcionmenu';
import { Storage } from '@ionic/storage-angular';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { ObtenerUserService } from './services/obtener-user.service';


@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {

  usuario: Usuario={
    username:'',
    password:'',
    estado:0
  };

  opciones: Opcionmenu[] = [
    {
      destino: 'home',
      icono: 'home',
      texto: 'Home',
    },
    {
      destino: 'home',
      icono: 'qr-code-outline',
      texto: 'Escanear codigo QR',
    },
    {
      destino: 'asistencia',
      icono: 'checkmark-done-outline',
      texto: 'Mi asistencia',
    },
    // {
    //   destino:'login',
    //   icono:'log-out',
    //   texto:'Cerrar Sesión',
    // },
  ]

  constructor(public obtenerUser:ObtenerUserService,
    private storage: Storage, 
    private router: Router, 
    private menuCtrl: MenuController,) {

  }

   async ngOnInit() {
    await this.storage.create();
  }

  async cerrarSesion() {
    this.usuario= await this.obtenerUser.obtenerUsuario();
    this.usuario.estado = 0;
    await this.storage.set(this.usuario.username,this.usuario)
    this.router.navigate(['/login']);

  }

  async buscarUsuario(){
    this.usuario= await this.obtenerUser.obtenerUsuario();
  }
}
