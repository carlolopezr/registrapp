import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asignatura } from '../../interfaces/opcionmenu';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  scanIsActive=false;
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

  constructor(private activeRoute: ActivatedRoute, private router: Router, private qrScanner: QRScanner) {
    this.activeRoute.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.nombreUsuario = this.router.getCurrentNavigation().extras.state.miUsuario.username;
      }
    });
  }

  scannearQR() {
    document.getElementById('content').classList.add('transparent');
    document.querySelector('ion-app').classList.add('transparent');
    /*this.qrScanner.prepare()
      .then((status: QRScannerStatus) => {
        if (status.authorized) {
          
          // camera permission was granted
          

          
          // start scanning
          let scanSub = this.qrScanner.scan().subscribe(resp => {
            console.log('Scanned something', resp);
            

            this.qrScanner.hide(); // hide camera preview
            scanSub.unsubscribe(); // stop scanning
          });

        } else if (status.denied) {
          this.scanIsActive=false;
          // camera permission was permanently denied
          // you must use QRScanner.openSettings() method to guide the user to the settings page
          // then they can grant the permission from there
        } else {
          // permission was denied, but not permanently. You can ask for permission again at a later time.
        }
      })
      .catch((e: any) => console.log('Error is', e));*/
  }

}