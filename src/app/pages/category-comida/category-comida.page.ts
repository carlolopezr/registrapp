import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiciocomidaService } from '../../services/serviciocomida.service';
import { Meal } from '../../interfaces/comida';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';

@Component({
  selector: 'app-category-comida',
  templateUrl: './category-comida.page.html',
  styleUrls: ['./category-comida.page.scss'],
})
export class CategoryComidaPage implements OnInit {

  meals:Meal[];
  category:string;
  constructor(private activeRoute: ActivatedRoute, private router:Router, private servicioComida:ServiciocomidaService, private iab: InAppBrowser) {
    this.activeRoute.queryParams.subscribe(params =>{
      if(this.router.getCurrentNavigation().extras.state){
        this.category = this.router.getCurrentNavigation().extras.state.miCategory;
      }
    });
  }

  ngOnInit() {
    this.servicioComida.getByCategory(this.category).subscribe(resp =>{
      this.meals = resp.meals;
    });
  }

  onClick(idMeal:string){
    const browser = this.iab.create(`https://www.themealdb.com/meal/${idMeal}`, '_system');
  }
}
