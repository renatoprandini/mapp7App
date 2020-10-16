import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ChangeDisplaynamePage } from './change-displayname.page';

const routes: Routes = [
  {
    path: '',
    component: ChangeDisplaynamePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChangeDisplaynamePageRoutingModule {}
