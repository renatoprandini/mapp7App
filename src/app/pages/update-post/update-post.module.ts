import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { IonicModule } from '@ionic/angular';

import { UpdatePostPageRoutingModule } from './update-post-routing.module';

import { UpdatePostPage } from './update-post.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    UpdatePostPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [UpdatePostPage]
})
export class UpdatePostPageModule {}
