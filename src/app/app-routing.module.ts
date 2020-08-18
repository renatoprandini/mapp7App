import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'tab1',
    loadChildren: () => import('./pages/tab1/tab1.module').then(m => m.Tab1PageModule)
  },
  {
    path: 'tab2',
    loadChildren: () => import('./pages/tab2/tab2.module').then(m => m.Tab2PageModule)
  },
  {
    path: 'tab3',
    loadChildren: () => import('./pages/tab3/tab3.module').then(m => m.Tab3PageModule)
  },
  {
    path: '',
    loadChildren: () => import('./pages/tabs/tabs.module').then(m => m.TabsPageModule)
  },
  {
    path: 'mapa',
    loadChildren: () => import('./pages/mapa/mapa.module').then(m => m.MapaPageModule)
  },
  {
    path: 'post',
    loadChildren: () => import('./pages/post/post.module').then(m => m.PostPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/auth/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./pages/auth/signup/signup.module').then(m => m.SignupPageModule)
  },
  {
    path: 'update-post/:id',
    loadChildren: () => import('./pages/update-post/update-post.module').then(m => m.UpdatePostPageModule)
  },
  {
    path: 'settings',
    loadChildren: () => import('./pages/settings/settings.module').then(m => m.SettingsPageModule)
  },
  {
    path: 'about',
    loadChildren: () => import('./pages/settings/about/about.module').then(m => m.AboutPageModule)
  },
  {
    path: 'change-name',
    loadChildren: () => import('./pages/settings/change-name/change-name.module').then(m => m.ChangeNamePageModule)
  },
  {
    path: 'change-photo',
    loadChildren: () => import('./pages/settings/change-photo/change-photo.module').then(m => m.ChangePhotoPageModule)
  },
  {
    path: 'faq',
    loadChildren: () => import('./pages/settings/faq/faq.module').then(m => m.FaqPageModule)
  },
  {
    path: 'notifications',
    loadChildren: () => import('./pages/settings/notifications/notifications.module').then(m => m.NotificationsPageModule)
  },  {
    path: 'profile',
    loadChildren: () => import('./pages/profile/profile.module').then( m => m.ProfilePageModule)
  }


];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
