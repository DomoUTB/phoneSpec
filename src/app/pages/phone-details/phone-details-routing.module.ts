import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PhoneDetailsPage } from './phone-details.page';

const routes: Routes = [
  {
    path: '',
    component: PhoneDetailsPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PhoneDetailsPageRoutingModule {}
