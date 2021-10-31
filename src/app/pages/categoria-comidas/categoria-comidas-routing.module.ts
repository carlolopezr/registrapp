import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoriaComidasPage } from './categoria-comidas.page';

const routes: Routes = [
  {
    path: '',
    component: CategoriaComidasPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriaComidasPageRoutingModule {}
