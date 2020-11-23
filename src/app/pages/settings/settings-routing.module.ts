import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsPage } from './settings.page';

const routes: Routes = [
  {
    path: '',
    component: SettingsPage
  },
  {
    path: 'about',
    loadChildren: () => import('./about/about.module').then( m => m.AboutPageModule)
  },
  {
    path: 'change-photo',
    loadChildren: () => import('./change-photo/change-photo.module').then( m => m.ChangePhotoPageModule)
  },
  {
    path: 'change-name',
    loadChildren: () => import('./change-name/change-name.module').then( m => m.ChangeNamePageModule)
  },
  {
    path: 'change-displayname',
    loadChildren: () => import('./change-displayname/change-displayname.module').then( m => m.ChangeDisplaynamePageModule)
  },
  {
    path: 'aboutapp',
    loadChildren: () => import('./aboutapp/aboutapp.module').then( m => m.AboutappPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SettingsPageRoutingModule {}
