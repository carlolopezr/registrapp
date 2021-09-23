import { Component, OnInit } from '@angular/core';
import { AlertController, MenuController } from '@ionic/angular';
import { Router } from '@angular/router';

@Component({
  selector: 'app-restablecer-contrasena',
  templateUrl: './restablecer-contrasena.page.html',
  styleUrls: ['./restablecer-contrasena.page.scss'],
})
export class RestablecerContrasenaPage implements OnInit {

  

  email:string;

  constructor( private alertController: AlertController, private router: Router, private menuCtrl:MenuController) { }

  ngOnInit() {
  }

  onSubmit(){
    this.presentAlertConfirm();
   
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({

      mode: 'ios',
      header: 'Email enviado correctamente',
      message: 'Email enviado a '+ this.email + ' por favor revise su bandeja de entrada',
      buttons: [, {
          text: 'Aceptar',
          handler: () => {
            this.router.navigate(['/login'])
          }
        }
      ]
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
