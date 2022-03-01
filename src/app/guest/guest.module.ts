import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BrowserModule } from '@angular/platform-browser';

import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { GuestRoutingModule } from './guest-routing.module';
import { RouterModule } from '@angular/router';
import { GuestComponent } from './guest/guest.component';
import { authInterceptorProviders } from '../_helpers/auth.interceptor';
import { HomeComponent } from './home/home.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SearchComponent } from './search/search.component';
import { CenterDetailGuestComponent } from './center-detail-guest/center-detail-guest.component';
import { ReviewBoxComponent } from './review-box/review-box.component';

import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  providers: [authInterceptorProviders],
  declarations: [
    LoginComponent,
    RegisterComponent,
    GuestComponent,
    HomeComponent,
    SearchComponent,
    CenterDetailGuestComponent,
    ReviewBoxComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    GuestRoutingModule,
    RouterModule,
    NgxPaginationModule,
    ReactiveFormsModule,
  ],
  exports: [],
})
export class GuestModule {}
