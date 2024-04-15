import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DisplayDriverDetailsPageRoutingModule } from './display-driver-details-routing.module';

import { DisplayDriverDetailsPage } from './display-driver-details.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DisplayDriverDetailsPageRoutingModule
  ],
  declarations: [DisplayDriverDetailsPage]
})
export class DisplayDriverDetailsPageModule {}
