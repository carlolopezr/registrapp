import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../interfaces/opcionmenu';
import { AlertController, MenuController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.page.html',
  styleUrls: ['./registrar.page.scss'],
})
export class RegistrarPage implements OnInit {

  usuario:Usuario = {
    username: '',
    password: '',
    estado:0
  }
  constructor(private alertController: AlertController, private menuCtrl:MenuController, private storage:Storage, private router:Router) { }

  ngOnInit() {
  }

  onSubmit(){
    if(this.usuario.username!=='' && this.usuario.password!==''){
      this.guardarUsuario(this.usuario)
    }
    else{
      this.presentAlertFaltaUsuario()
    }
  }

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
      message: 'Ingrese otro nombre de usuario',
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
      buttons: [{
        text: 'Aceptar',
        handler: () =>{
            this.router.navigate(['/login']);
        }
      }]
    });

    await alert.present();
  }

  async presentAlertFaltaUsuario() {
    const alert = await this.alertController.create({
      mode: 'ios',
      header: 'Complete los campos',
      message: 'Por favor, complete los campos solicitados',
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
