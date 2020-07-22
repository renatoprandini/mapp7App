import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeDataPageRoutingModule } from './change-data-routing.module';

import { ChangeDataPage } from './change-data.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeDataPageRoutingModule
  ],
  declarations: [ChangeDataPage]
})
export class ChangeDataPageModule {}
