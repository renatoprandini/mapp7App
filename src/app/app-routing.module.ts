import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

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
    path: 'change-photo',
    loadChildren: () => import('./pages/settings/change-photo/change-photo.module').then(m => m.ChangePhotoPageModule)
  },
  {
    path: 'change-name',
    loadChildren: () => import('./pages/settings/change-name/change-name.module').then( m => m.ChangeNamePageModule)
  },
  {
    path: 'change-displayname',
    loadChildren: () => import('./pages/settings/change-displayname/change-displayname.module').then( m => m.ChangeDisplaynamePageModule)
  },
  {
    path: 'verify-email',
    loadChildren: () => import('./pages/auth/verify-email/verify-email.module').then( m => m.VerifyEmailPageModule)
  },
  {
    path: 'password-recover',
    loadChildren: () => import('./pages/password-recover/password-recover.module').then( m => m.PasswordRecoverPageModule)
  },
  {
    path: 'view-post/:id/:mecanico',
    loadChildren: () => import('./pages/view-post/view-post.module').then( m => m.ViewPostPageModule)
  },
  {
    path: 'comments/:id',
    loadChildren: () => import('./pages/comments/comments.module').then( m => m.CommentsPageModule)
  },
  {
    path: 'aboutapp',
    loadChildren: () => import('./pages/settings/aboutapp/aboutapp.module').then( m => m.AboutappPageModule)
  }




];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
