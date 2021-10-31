import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoryComidaPageRoutingModule } from './category-comida-routing.module';

import { CategoryComidaPage } from './category-comida.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoryComidaPageRoutingModule
  ],
  declarations: [CategoryComidaPage]
})
export class CategoryComidaPageModule {}
