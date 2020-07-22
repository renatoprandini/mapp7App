import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeDataPage } from './change-data.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeDataPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeDataPageRoutingModule {}
