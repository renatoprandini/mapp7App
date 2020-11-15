import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ViewPostPage } from './view-post.page';

const routes: Routes = [
  {
    path: '',
    component: ViewPostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ViewPostPageRoutingModule {}
