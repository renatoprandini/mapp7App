import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeDisplaynamePageRoutingModule } from './change-displayname-routing.module';

import { ChangeDisplaynamePage } from './change-displayname.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ChangeDisplaynamePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [ChangeDisplaynamePage]
})
export class ChangeDisplaynamePageModule {}
