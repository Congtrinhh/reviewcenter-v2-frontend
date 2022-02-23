import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { FormsModule } from '@angular/forms';
import { KeyValuePipe } from './_helpers/key-value.pipe';
import { NgxPaginationModule } from 'ngx-pagination';
import { YesNoPipe } from './_helpers/yes-no.pipe';
import { CategoryListComponent } from './category/category-list/category-list.component';
import { CategoryDetailComponent } from './category/category-detail/category-detail.component';
import { DeleteConfirmModalComponent } from './delete-confirm-modal/delete-confirm-modal.component';
import { RoleListComponent } from './role/role-list/role-list.component';
import { RoleDetailComponent } from './role/role-detail/role-detail.component';
import { CenterListComponent } from './center/center-list/center-list.component';
import { CenterDetailComponent } from './center/center-detail/center-detail.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UrlValidatorDirective } from './_helpers/url-validator.directive';
import { LoginAdminComponent } from './login-admin/login-admin.component';

@NgModule({
  declarations: [
    AdminComponent,
    KeyValuePipe,
    YesNoPipe,
    CategoryListComponent,
    CategoryDetailComponent,
    DeleteConfirmModalComponent,
    RoleListComponent,
    RoleDetailComponent,
    CenterListComponent,
    CenterDetailComponent,
    UserListComponent,
    UserDetailComponent,
    UrlValidatorDirective,
    LoginAdminComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule, NgxPaginationModule],
})
export class AdminModule {}
