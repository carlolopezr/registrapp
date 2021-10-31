import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage-angular';
import { Usuario } from '../../interfaces/opcionmenu';
import { AlertController } from '@ionic/angular';
import { Router, NavigationExtras } from '@angular/router';

@Component({
  selector: 'app-iniciar-sesion',
  templateUrl: './iniciar-sesion.page.html',
  styleUrls: ['./iniciar-sesion.page.scss'],
})
export class IniciarSesionPage implements OnInit {

  usuario:Usuario={
    username:'',
    password:'',
    estado:0
  }
  constructor(private storage:Storage, private alertController:AlertController, private router:Router) { }

  ngOnInit() {
  }

  onSubmit(){
    this.iniciarSesion(this.usuario);
  }

  //Inicia sesión si es que el usuario existe y la password ingresada es correcta
  async iniciarSesion(user:Usuario){
    const name = await this.storage.get(user.username);
    if(name && name.password===user.password){
      let navExtras: NavigationExtras = {
        state: {
          miUsuario: this.usuario
        }
      }
      this.router.navigate(['/home'], navExtras);
    }
    else{
      this.presentAlert();
    }
  }

  //Alerta por si es que el usuario o contraseña ingresados son incorrectos
  async presentAlert() {
    const alert = await this.alertController.create({
      mode: 'ios',
      header: 'Usuario o contraseña incorrectos',
      message: 'Por favor, ingrese un usuario y contraseña correctos',
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}
