import { Usuario,Asistencia } from './../../interfaces/opcionmenu';
import { Component, OnInit } from '@angular/core';
import { BasedatosService } from '../../services/basedatos.service';
import { AlertController, LoadingController } from '@ionic/angular';
import { ObtenerUserService } from '../../services/obtener-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CursosPage } from '../cursos/cursos.page';



@Component({
  selector: 'app-asistencia',
  templateUrl: './asistencia.page.html',
  styleUrls: ['./asistencia.page.scss'],
})
export class AsistenciaPage implements OnInit {

  usuario:Usuario
  static codigo:string;

  asistencia:Asistencia = {
    id: '',
    username: '',
    idasig:'',
    fecha: 0,
  }

  asistencias: Asistencia[];
  asistencias2:Asistencia[]=[];

  loading:any;
  constructor(private router: Router,private lc: LoadingController ,
    private ac: AlertController, 
    public db: BasedatosService,
    public obtenerUser:ObtenerUserService,
    private ar:ActivatedRoute) {
      /*this.ar.queryParams.subscribe(params => {
        if (this.router.getCurrentNavigation().extras.state) {
          this.codigo = this.router.getCurrentNavigation().extras.state.cod;
        }
      });*/
     }

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
    if(this.usuario!=null){
      this.db.getCollectionQuery<Asistencia>(enlace, parametro, this.usuario.username).subscribe( res =>{
        this.asistencias=res;
        this.asistencias.sort((a, b) => (a.fecha) - (b.fecha))
        this.asistencias.forEach(element => { 
          if(element.idasig==AsistenciaPage.codigo)
          {
            this.asistencias2.push(element)
          }      
          });   
          
        }
      )
    }
   
    
      
 }

}
