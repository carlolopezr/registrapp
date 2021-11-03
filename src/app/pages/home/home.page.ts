import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asignatura, Asistencia, Usuario } from '../../interfaces/opcionmenu';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { ObtenerUserService } from '../../services/obtener-user.service';
import { BasedatosService } from '../../services/basedatos.service';
import { AlertController, MenuController,LoadingController } from '@ionic/angular';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  loading:any;
  usuario:Usuario;
  data:string;
  fecha=Date.now()
  asistencia:Asistencia ={
    id:'',
    idasig:'asd',
    username:'wacoldo',
    fecha:''

  };

  nombreUsuario: '';



  constructor(private activeRoute: ActivatedRoute, private router: Router, 
    private qrScanner: QRScanner, 
    private ac:AlertController,
    public obtUser:ObtenerUserService,
    public db:BasedatosService,
    public lc:LoadingController) {
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
            this.guardarAsistencia(resp).then((_) => {
              this.presentAlertConfirm()}).then( () =>{
              this.removeCamera();
              scanSub.unsubscribe();
              this.qrScanner.destroy();
            });
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

  async guardarAsistencia(data:string){
    
    const fecha = this.fecha
    const enlace = 'asistencia';
    this.usuario = await this.obtUser.obtenerUsuario();
    this.asistencia.id = this.db.createID();
    this.asistencia.username = this.usuario.username;
    this.asistencia.idasig = data;
    this.asistencia.fecha = fecha.toString()
    const datos = this.asistencia;
    this.db.createDocument<Asistencia>(datos,enlace,datos.id)//.then((_) => {
      //this.loading.dismiss();
      //this.presentAlertConfirm()});
  }

  async presentLoading(){
    this.loading = await this.lc.create({
      message:'guardando asistencia',
    });
    await this.loading.present();

  }

  async presentAlertConfirm() {
    const alert = await this.ac.create({

      mode: 'ios',
      header: 'Asistencia guardada con exito!',
      cssClass: 'alert-button-group',
      buttons: [{
          text: 'Aceptar'
        },
        { text: 'Ir a asistencia',
          handler: () =>{
          this.router.navigate(['/asistencia']);
        }} 
      ]
    });
    await alert.present();
  }
  

}
