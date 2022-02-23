import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile/profile.component';
import { RegisterComponent } from './register/register.component';

// const routes: Routes = [
//   { path: 'home', component: GuestComponent },
//   { path: 'login', component: LoginComponent },
//   { path: 'register', component: RegisterComponent },
//   { path: 'profile', component: ProfileComponent },
//   { path: 'user', component: BoardUserComponent },
//   { path: 'mod', component: BoardModeratorComponent },
//   { path: 'admin', component: BoardAdminComponent },
//   { path: '', redirectTo: 'home', pathMatch: 'full' },
// ];

@NgModule({
  declarations: [],
  imports: [CommonModule],
  // imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuestRoutingModule {}
