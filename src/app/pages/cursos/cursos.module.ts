import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { CursosPageRoutingModule } from './cursos-routing.module';
import { ComponentsModule } from '../../components/components.module';
import { CursosPage } from './cursos.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CursosPageRoutingModule,
    ComponentsModule,
  ],
  declarations: [CursosPage]
})
export class CursosPageModule {}
