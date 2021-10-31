import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CategoryComidaPage } from './category-comida.page';

const routes: Routes = [
  {
    path: '',
    component: CategoryComidaPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryComidaPageRoutingModule {}
