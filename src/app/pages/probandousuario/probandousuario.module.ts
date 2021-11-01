import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ProbandousuarioPageRoutingModule } from './probandousuario-routing.module';

import { ProbandousuarioPage } from './probandousuario.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ProbandousuarioPageRoutingModule
  ],
  declarations: [ProbandousuarioPage]
})
export class ProbandousuarioPageModule {}
