import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Asignatura } from '../../interfaces/opcionmenu';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  nombreUsuario:'';

  asignaturas:Asignatura[]=[
    {
    nombre:'Estadistica Descriptiva',
    codigo:'2421',
    porcentaje:78,
    seccion:'004D'
    },
    {
      nombre:'Arquitectura de Software',
      codigo:'ASY4131',
      porcentaje:100,
      seccion:'002D', 
    }
]
  
  constructor(private activeRoute: ActivatedRoute, private router:Router) {
    this.activeRoute.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.nombreUsuario = this.router.getCurrentNavigation().extras.state.miUsuario.username;
      }
    });
  }

}
