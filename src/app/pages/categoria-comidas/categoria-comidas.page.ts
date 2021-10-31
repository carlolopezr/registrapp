import { Component, OnInit } from '@angular/core';
import { ServiciocomidaService } from '../../services/serviciocomida.service';
import { Categories, Category } from '../../interfaces/comida';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-categoria-comidas',
  templateUrl: './categoria-comidas.page.html',
  styleUrls: ['./categoria-comidas.page.scss'],
})
export class CategoriaComidasPage implements OnInit {

  categories:Category[];
  constructor(private servicioComida:ServiciocomidaService, private router:Router) { }

  ngOnInit() {
    this.servicioComida.getCategories().subscribe(resp =>{
      this.categories = resp.categories
    })
    
  }

  onClick(category:string){
    let navExtras: NavigationExtras = {
      state: {
        miCategory: category
      }
    }
    this.router.navigate(['/category-comida'], navExtras);
  }

}
