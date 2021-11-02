import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asignatura, Asistencia, Usuario } from '../../interfaces/opcionmenu';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AlertController } from '@ionic/angular';
import { ObtenerUserService } from '../../services/obtener-user.service';
import { BasedatosService } from '../../services/basedatos.service';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  usuario:Usuario;
  data:string;
  asistencia:Asistencia;

  nombreUsuario: '';



  constructor(private activeRoute: ActivatedRoute, private router: Router, 
    private qrScanner: QRScanner, 
    private alertController:AlertController,
    public obtUser:ObtenerUserService,
    public db:BasedatosService) {
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
            scanSub.unsubscribe();
            this.qrScanner.destroy();
            this.removeCamera();
            // this.presentAlert(resp);
            this.guardarAsistencia(resp)
          });
        } else if (status.denied) {
          this.qrScanner.openSettings();
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          this.qrScanner.prepare()
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

  async guardarAsistencia(data:string){

    const enlace = 'asistencia';
    this.usuario = await this.obtUser.obtenerUsuario();
    this.asistencia.id = this.db.createID();
    this.asistencia.username = this.usuario.username
    this.asistencia.idasig = data;
    this.db.createDocument<Asistencia>(this.asistencia,enlace,this.asistencia.id)
  }
  

}
