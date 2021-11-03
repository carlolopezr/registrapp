import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';
import { Usuario } from '../../interfaces/opcionmenu';
import { Storage } from '@ionic/storage-angular';
import { AppComponent } from '../../app.component';
import { ObtenerUserService } from '../../services/obtener-user.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  usuario:Usuario={
    username:'',
    password:'',
    estado:0
  }
  usuario2:Usuario={
    username:'',
    password:'',
    estado:0
  }
  constructor(private router: Router, 
    private alertController: AlertController, 
    private menuCtrl:MenuController,
    private storage:Storage, private appc:AppComponent,
    private obtUser:ObtenerUserService) { }

  async ngOnInit() {
    this.usuario = await this.obtUser.obtenerUsuario()
    this.usuario.estado=0;
    await this.storage.set(this.usuario.username, this.usuario);
  }

  onSubmit(){
    this.iniciarSesion(this.usuario);
  }

  async iniciarSesion(user:Usuario){
    const name = await this.storage.get(user.username);
    if(name && name.password===user.password){
      name.estado=1
      await this.storage.set(name.username, name);
      this.appc.buscarUsuario();
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

  async presentAlert() {
    const alert = await this.alertController.create({
      mode: 'ios',
      header: 'Usuario o contraseña incorrectos',
      message: 'Por favor, ingrese un usuario y contraseña correctos',
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
