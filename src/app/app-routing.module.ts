import { AdminComponent } from './admin/admin/admin.component';
import { GuestComponent } from './guest/guest/guest.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ProfileComponent } from './guest/profile/profile.component';
import { RegisterComponent } from './guest/register/register.component';
import { CategoryListComponent } from './admin/category/category-list/category-list.component';
import { CategoryDetailComponent } from './admin/category/category-detail/category-detail.component';
import { RoleListComponent } from './admin/role/role-list/role-list.component';
import { RoleDetailComponent } from './admin/role/role-detail/role-detail.component';
import { CenterListComponent } from './admin/center/center-list/center-list.component';
import { CenterDetailComponent } from './admin/center/center-detail/center-detail.component';
import { UserListComponent } from './admin/user/user-list/user-list.component';
import { UserDetailComponent } from './admin/user/user-detail/user-detail.component';
import { LoginAdminComponent } from './admin/login-admin/login-admin.component';
import { LoginComponent } from './guest/login/login.component';
import { AuthGuard } from './_helpers/auth.guard';
import { HomeComponent } from './guest/home/home.component';

const routes: Routes = [
  {
    // guest
    path: '',
    component: GuestComponent,
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'home', component: HomeComponent },
    ],
  },
  // {
  //   // default
  //   path: 'home',
  //   redirectTo: '',
  //   pathMatch: 'full',
  // },
  {
    // admin
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: 'categories', component: CategoryListComponent },
      { path: 'categories/:id', component: CategoryDetailComponent },
      { path: 'categories/new', component: CategoryDetailComponent },
      { path: 'roles', component: RoleListComponent },
      { path: 'roles/:id', component: RoleDetailComponent },
      { path: 'roles/new', component: RoleDetailComponent },
      { path: 'centers', component: CenterListComponent },
      { path: 'centers/:id', component: CenterDetailComponent },
      { path: 'centers/new', component: CenterDetailComponent },
      { path: 'users', component: UserListComponent },
      { path: 'users/:id', component: UserDetailComponent },
      { path: 'users/new', component: UserDetailComponent },
    ],
  },
  { path: 'admin-login', component: LoginAdminComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
