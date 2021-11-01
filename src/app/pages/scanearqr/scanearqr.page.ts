import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-scanearqr',
  templateUrl: './scanearqr.page.html',
  styleUrls: ['./scanearqr.page.scss'],
})
export class ScanearqrPage implements OnInit {

  mensaje:string;
  constructor(private qrScanner: QRScanner, private alertController:AlertController) { }

  ngOnInit() {
    
  }

  scannearQR() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          this.qrScanner.show();
          this.showCamera();

          // start scanning
          let scanSub = this.qrScanner.scan().subscribe(resp => {
            this.showContent();
            this.mensaje = resp;
            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
            this.presentAlert(this.mensaje);
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

  showContent() {
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
