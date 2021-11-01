import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Usuario } from '../../interfaces/opcionmenu';
import { Storage } from '@ionic/storage-angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario:Usuario = {
    username: '',
    password: '',
    estado:0
  }
  constructor(private router: Router, private alertController: AlertController, private menuCtrl:MenuController, private storage:Storage) { }

  ngOnInit() {
  }

  /*onSubmit() {
    if (this.usuario.username === "wacoldo" && this.usuario.password === "asd") {
      let navExtras: NavigationExtras = {
        state: {
          miUsuario: this.usuario
        }
      }
      this.router.navigate(['/home'], navExtras);
    }
    else {
      this.presentAlert();
    }
  }*/

  onSubmit(){
    this.guardarUsuario(this.usuario)
  }

  //Verifica que el usuario no exista en la base de datos antes de guardarlo
  async guardarUsuario(user:Usuario){
    const name = await this.storage.get(user.username);
    if(name){
      this.presentAlert();
    }
    else{
      await this.storage.set(user.username, user);
      this.presentAlertExito();
    }  
  }

  //Alerta por si es que existe el usuario
  async presentAlert() {
    const alert = await this.alertController.create({
      mode: 'ios',
      header: 'El usuario ya existe',
      message: 'Escriba otro nombre de usuario',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  //Alerta por si es que el registro es exitoso
  async presentAlertExito() {
    const alert = await this.alertController.create({
      mode: 'ios',
      header: 'Usuario registrado',
      message: 'Usuario registrado con éxito',
      buttons: ['Aceptar']
    });

    await alert.present();
  }

  ionViewDidEnter(){
    this.menuCtrl.enable(false,'first');
  }

  ionViewWillLeave(){
    this.menuCtrl.enable(true,'first');
  }

}
