import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ScanearqrPage } from './scanearqr.page';

const routes: Routes = [
  {
    path: '',
    component: ScanearqrPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScanearqrPageRoutingModule {}
