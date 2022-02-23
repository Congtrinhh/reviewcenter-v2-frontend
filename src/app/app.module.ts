import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { GuestModule } from './guest/guest.module';

import { RouterModule } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { authInterceptorProviders } from './_helpers/auth.interceptor';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    GuestModule,
    RouterModule,
    AdminModule,
    NgxPaginationModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent],
})
export class AppModule {}
