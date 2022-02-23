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

@NgModule({
  providers: [authInterceptorProviders],
  declarations: [
    LoginComponent,
    RegisterComponent,
    GuestComponent,
    HomeComponent,
    SearchComponent,
  ],
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    GuestRoutingModule, // so that ...
    RouterModule,
    NgxPaginationModule,
  ],
  exports: [],
})
export class GuestModule {}
