import { Component, OnInit } from '@angular/core';
import { Usuario, Asistencia } from '../../interfaces/opcionmenu';
import { ActivatedRoute, Router } from '@angular/router';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AlertController, LoadingController, Platform } from '@ionic/angular';
import { ObtenerUserService } from '../../services/obtener-user.service';
import { BasedatosService } from '../../services/basedatos.service';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-qrscanner',
  templateUrl: './qrscanner.page.html',
  styleUrls: ['./qrscanner.page.scss'],
})
export class QrscannerPage implements OnInit {

  loading:any;
  usuario:Usuario;
  data:string;
  fecha=Date.now()
  asistencia:Asistencia ={
    id:'',
    idasig:'',
    username:'',
    fecha:0,

  };

  constructor(private router: Router,
    private qrScanner: QRScanner,
    private ac: AlertController,
    public obtUser: ObtenerUserService,
    public db: BasedatosService,
    public lc: LoadingController, public platform:Platform, private socialSharing:SocialSharing, private datePipe:DatePipe) { }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.ScanQR();
  }

  ScanQR() {
    this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          // camera permission was granted
          this.qrScanner.show();
          this.showCamera();
          let hBButton = this.platform.backButton.subscribe(() =>
            {
              this.removeCamera();  //hide camera
              this.qrScanner.hide();  //hide camera
              scanSub.unsubscribe() //stop scanning
              this.qrScanner.destroy();   //destroy scanner instance  
              hBButton.unsubscribe(); //stop backbutton
            })

          // start scanning
          let scanSub = this.qrScanner.scan().subscribe(resp => {
            this.guardarAsistencia(resp)
            .then(() => this.sendEmail(this.asistencia))
            .then(() =>{
                this.removeCamera();  //hide camera
                this.qrScanner.hide();  //hide camera
                scanSub.unsubscribe();  //stop scanning
                this.qrScanner.destroy(); //destroy scanner instance  
                hBButton.unsubscribe(); //stop backbutton
                this.router.navigate(['/home'])
              })
          });
        } else if (status.denied) {
          this.qrScanner.openSettings();
        } else {
          this.qrScanner.prepare()
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

  async guardarAsistencia(data: string) {

    const fecha = this.fecha;
    const enlace = 'asistencia';
    this.usuario = await this.obtUser.obtenerUsuario();
    this.asistencia.id = this.db.createID();
    this.asistencia.username = this.usuario.username;
    this.asistencia.idasig = data;
    this.asistencia.fecha = fecha
    const datos = this.asistencia;
    this.db.createDocument<Asistencia>(datos, enlace, datos.id)//.then((_) => {
    //this.loading.dismiss();
    //this.presentAlertConfirm()});
  }

  async presentLoading() {
    this.loading = await this.lc.create({
      message: 'guardando asistencia',
    });
    await this.loading.present();

  }

  async presentAlertConfirm() {
    const alert = await this.ac.create({

      mode: 'ios',
      header: 'Asistencia guardada y enviada con éxito!',
      cssClass: 'alert-button-group',
      buttons: ['Aceptar',
      ]
    });
    await alert.present();
  }

  sendEmail(data){
    const fecha = this.datePipe.transform(data.fecha,'dd/MM/yyyy');
    this.socialSharing.shareViaEmail('Alumno: ' + data.username + ' -  Asignatura: ' + data.idasig + ' - Fecha: ' + fecha, 'Asistencia ' + fecha, ['cristianlopezr.931@gmail.com']).then(() =>{
      this.presentAlertConfirm();
    })
  }

}
