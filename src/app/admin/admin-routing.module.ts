import { LoginAdminComponent } from './login-admin/login-admin.component';
import { UserDetailReactiveFormComponent } from './user-detail-reactive-form/user-detail-reactive-form.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { CenterDetailComponent } from './center/center-detail/center-detail.component';
import { CenterListComponent } from './center/center-list/center-list.component';
import { RoleDetailComponent } from './role/role-detail/role-detail.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { CategoryDetailComponent } from './category/category-detail/category-detail.component';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';

const routes: Routes = [
  { path: 'admin-login', component: LoginAdminComponent },
  {
    path: 'admin',
    component: AdminComponent,
    // canActivate: [AuthGuard],
    children: [
      { path: 'categories', component: CategoryListComponent },
      { path: 'categories/new', component: CategoryDetailComponent },
      { path: 'categories/:id', component: CategoryDetailComponent },
      { path: 'roles', component: RoleListComponent },
      { path: 'roles/new', component: RoleDetailComponent },
      { path: 'roles/:id', component: RoleDetailComponent },
      { path: 'centers', component: CenterListComponent },
      { path: 'centers/new', component: CenterDetailComponent },
      { path: 'centers/:id', component: CenterDetailComponent },
      { path: 'users', component: UserListComponent },
      { path: 'users/new', component: UserDetailReactiveFormComponent },
      { path: 'users/:id', component: UserDetailReactiveFormComponent },
      // { path: '', component: DashboardComponent },
    ],
  },
];
@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
