import { Component, OnInit } from '@angular/core';
import { NavigationExtras, Router } from '@angular/router';
import { AlertController, MenuController } from '@ionic/angular';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  usuario = {
    username: '',
    password: '',
  }
  constructor(private router: Router, private alertController: AlertController, private menuCtrl:MenuController) { }

  ngOnInit() {
  }

  onSubmit() {
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
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Usuario o contraseña incorrectos',
      message: 'Por favor, ingrese un usuario y contraseña correctos',
      buttons: ['OK']
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
