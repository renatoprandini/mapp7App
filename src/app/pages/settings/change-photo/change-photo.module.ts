import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangePhotoPageRoutingModule } from './change-photo-routing.module';

import { ChangePhotoPage } from './change-photo.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangePhotoPageRoutingModule
  ],
  declarations: [ChangePhotoPage]
})
export class ChangePhotoPageModule {}
