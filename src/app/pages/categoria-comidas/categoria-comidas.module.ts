import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CategoriaComidasPageRoutingModule } from './categoria-comidas-routing.module';

import { CategoriaComidasPage } from './categoria-comidas.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CategoriaComidasPageRoutingModule
  ],
  declarations: [CategoriaComidasPage]
})
export class CategoriaComidasPageModule {}
