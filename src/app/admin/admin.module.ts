import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from './admin/admin.component';
import { CategoryComponent } from './category/category.component';
import { FormsModule } from '@angular/forms';
import { ListComponent } from './list/list.component';
import { KeyValuePipe } from './_helpers/key-value.pipe';
import { ConfirmDeleteComponent } from './confirm-delete/confirm-delete.component';

@NgModule({
  declarations: [
    AdminComponent,
    CategoryComponent,
    ListComponent,
    KeyValuePipe,
    ConfirmDeleteComponent,
  ],
  imports: [CommonModule, RouterModule, FormsModule],
})
export class AdminModule {}
