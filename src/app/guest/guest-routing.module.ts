import { CenterDetailGuestComponent } from './center-detail-guest/center-detail-guest.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { GuestComponent } from './guest/guest.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: GuestComponent,
    children: [
      { path: 'centers/:slug', component: CenterDetailGuestComponent },
      { path: '', component: HomeComponent },
      { path: 'home', redirectTo: '/', pathMatch: 'full' },
    ],
  },
  { path: 'login', component: LoginComponent },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestRoutingModule {}
