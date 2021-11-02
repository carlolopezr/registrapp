import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asignatura } from '../../interfaces/opcionmenu';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nombreUsuario: '';

  asignaturas: Asignatura[] = [
    {
      nombre: 'Estadistica Descriptiva',
      codigo: '2421',
      porcentaje: 78,
      seccion: '004D'
    },
    {
      nombre: 'Arquitectura de Software',
      codigo: 'ASY4131',
      porcentaje: 100,
      seccion: '002D',
    }
  ]

  constructor(private activeRoute: ActivatedRoute, private router: Router, private qrScanner: QRScanner, private alertController:AlertController) {
    this.activeRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.nombreUsuario = this.router.getCurrentNavigation().extras.state.miUsuario.username;
      }
    });
  }

  ScanQR() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          this.qrScanner.show();
          this.showCamera();

          // start scanning
          let scanSub = this.qrScanner.scan().subscribe(resp => {
            this.removeCamera();
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            this.presentAlert(resp);
          });
        } else if (status.denied) {
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));
  }

  showCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.add('cameraView');
  }

  removeCamera() {
    (window.document.querySelector('ion-app') as HTMLElement).classList.remove('cameraView');
  }

  async presentAlert(mensaje:string) {
    const alert = await this.alertController.create({
      mode: 'ios',
      header: mensaje,
      message: 'Escriba otro nombre de usuario',
      buttons: ['Aceptar']
    });

    await alert.present();
  }
}
