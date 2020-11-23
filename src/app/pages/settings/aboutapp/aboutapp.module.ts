import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutappPageRoutingModule } from './aboutapp-routing.module';

import { AboutappPage } from './aboutapp.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutappPageRoutingModule
  ],
  declarations: [AboutappPage]
})
export class AboutappPageModule {}
