import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutappPage } from './aboutapp.page';

const routes: Routes = [
  {
    path: '',
    component: AboutappPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AboutappPageRoutingModule {}
