import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangePhotoPage } from './change-photo.page';

const routes: Routes = [
  {
    path: '',
    component: ChangePhotoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangePhotoPageRoutingModule {}
