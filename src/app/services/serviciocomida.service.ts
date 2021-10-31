import { Injectable } from '@angular/core';
import { Categories, Meals } from '../interfaces/comida';
import { HttpClient } from'@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServiciocomidaService {

  constructor(private httpClient:HttpClient) { }

  getCategories(){
    return this.httpClient.get<Categories>(`https://www.themealdb.com/api/json/v1/1/categories.php`);
  }

  getByCategory(category:string){
    return this.httpClient.get<Meals>(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
  }
}
