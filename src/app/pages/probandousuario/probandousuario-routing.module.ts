import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ProbandousuarioPage } from './probandousuario.page';

const routes: Routes = [
  {
    path: '',
    component: ProbandousuarioPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ProbandousuarioPageRoutingModule {}
