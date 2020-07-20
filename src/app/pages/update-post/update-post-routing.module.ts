import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { UpdatePostPage } from './update-post.page';

const routes: Routes = [
  {
    path: '',
    component: UpdatePostPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UpdatePostPageRoutingModule {}
