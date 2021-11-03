import { Component, OnInit } from '@angular/core';
import { Asignatura } from '../../interfaces/opcionmenu';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {

  cursos:Asignatura[]=[
    {
    nombre:'PROGRAMACION DE APLICACIONES MOVILES',
    codigo: 'PGY4121'
    },
    {
      nombre:'INGLES INTERMEDIO',
      codigo:'INI5111'
    },
    {
      nombre:'ESTADISTICA DESCRIPTIVA',
      codigo:'MAT4140'
    },
    {
      nombre:'CALIDAD DE SOFTWARE',
      codigo:'CSY4111'
    },
    {
      nombre:'ARQUITECTURA',
      codigo:'ASY4131'
    },  
  ]
    

  constructor(private router:Router) { }

  ngOnInit() {
  }

  asistencia(codigo:string){

    let navExtras:NavigationExtras = {
      state: {
        cod : codigo
      }
    }
    this.router.navigate(['/asistencia'], navExtras);
  }

}
