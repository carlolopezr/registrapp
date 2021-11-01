import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ScanearqrPageRoutingModule } from './scanearqr-routing.module';

import { ScanearqrPage } from './scanearqr.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ScanearqrPageRoutingModule
  ],
  declarations: [ScanearqrPage]
})
export class ScanearqrPageModule {}
