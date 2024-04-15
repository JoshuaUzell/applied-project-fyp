import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { DisplayDriverDetailsPage } from './display-driver-details.page';

const routes: Routes = [
  {
    path: '',
    component: DisplayDriverDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DisplayDriverDetailsPageRoutingModule {}
