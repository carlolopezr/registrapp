import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ServiciocomidaService } from '../../services/serviciocomida.service';
import { Meal } from '../../interfaces/comida';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { ActionSheetController } from '@ionic/angular';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';

@Component({
  selector: 'app-category-comida',
  templateUrl: './category-comida.page.html',
  styleUrls: ['./category-comida.page.scss'],
})
export class CategoryComidaPage implements OnInit {

  meals:Meal[];
  category:string;
  constructor(private activeRoute: ActivatedRoute, private router:Router, private servicioComida:ServiciocomidaService, private iab: InAppBrowser, public actionSheetController: ActionSheetController,
    private socialSharing:SocialSharing) {
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

  async shareRecipe(idMeal:string){
    const actionSheet = await this.actionSheetController.create({
      header: 'Acciones',
      buttons: [{
        text: 'Compartir',
        icon: 'share-social',
        handler: () => {
          this.compartir(idMeal)
        }
      },{
        text: 'Cancelar',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }]
    });
    await actionSheet.present();

    const { role } = await actionSheet.onDidDismiss();
    console.log('onDidDismiss resolved with role', role);
  }

  compartir(idMeal:string){
    this.socialSharing.share('Mira esta receta','Probando app',null,`https://www.themealdb.com/meal/${idMeal}`);   
  }
}
