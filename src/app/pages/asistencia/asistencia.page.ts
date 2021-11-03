import { Opcionmenu, Usuario,Asistencia } from './../../interfaces/opcionmenu';
import { Component, OnInit } from '@angular/core';
import { BasedatosService } from '../../services/basedatos.service';
import { AlertController, MenuController,LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';
import { ObtenerUserService } from '../../services/obtener-user.service';



@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  usuario:Usuario

  asistencia:Asistencia = {
    id: '',
    username: '',
    idasig:'',
    fecha:''
  }

  asistencias: Asistencia[];

  loading:any;
  constructor(private router: Router,private lc: LoadingController ,
    private ac: AlertController, 
    public db: BasedatosService,
    public obtenerUser:ObtenerUserService) { }

  ngOnInit() {
    this.getAsistencia()
  }

  onSubmit(){

    this.presentLoading();
    this.asistencia.id= this.db.createID();
    console.log(this.asistencia)
    const data = this.asistencia
    const enlace = 'asistencia';
    this.db.createDocument<Asistencia>(data,enlace, data.id).then((_) => {
      this.loading.dismiss();
      this.presentAlertConfirm();
    });
    

  }

  async presentAlertConfirm() {
    const alert = await this.ac.create({

      mode: 'ios',
      header: 'Asistencia guardada con exito!',
      buttons: [, {
          text: 'Aceptar',
          handler: () => {
            this.router.navigate(['/asistencia'])
          }
        }
      ]
    });

    

    await alert.present();
  }

  async presentLoading(){
    this.loading = await this.lc.create({
      message:'guardando asistencia',
    });
    await this.loading.present();

  }

  async getAsistencia(){
    const enlace = 'asistencia'
    const parametro ='username'
    this.usuario = await this.obtenerUser.obtenerUsuario()
    this.db.getCollectionQuery<Asistencia>(enlace, parametro, this.usuario.username).subscribe( res =>{
      this.asistencias=res;
    })
      
 }

}
