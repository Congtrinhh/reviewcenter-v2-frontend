import { User } from './../../_models/user.model';
import { Component, OnInit } from '@angular/core';
import { Role } from '../../_models/role.model';
import { BaseAdminService } from '../../_services/base-admin.service';
import { Location } from '@angular/common';

const basePath = 'users';
const roleBasePath = 'roles';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss'],
})
export class UserDetailComponent implements OnInit {
  item: User = {};

  errorMessage = '';

  createMode = false;

  roles: Role[] = [];

  constructor(
    private baseService: BaseAdminService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    const currentUrl = window.location.href;
    if (
      currentUrl.endsWith(basePath + '/new') ||
      currentUrl.endsWith(basePath + '/new/')
    ) {
      // create
      this.createMode = true;
      this.item = { enabled: 'true', roleIds: [] };
      this.baseService.getAll(roleBasePath, null).subscribe(
        (data: any) => {
          this.roles = data.roles;
        },
        (error: any) => {
          this.errorMessage = error.message;
        }
      );
    } else {
      // update
      this.createMode = false;
      let id: any = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
      id = Number(id);
      this.baseService.getOne(basePath, id).subscribe(
        (data: User) => {
          this.item = data;
          this.item.password = '';
          // if want to change password, enter new password
          // else, leave it blank
        },
        (error: any) => {
          this.errorMessage = error.message;
        }
      );
      this.baseService.getAll(roleBasePath, null).subscribe(
        (data: any) => {
          this.roles = data.roles;
        },
        (error) => {
          this.errorMessage = error.message;
        }
      );
    }
  }

  handleRoleChange(event: any) {
    if (event.target.checked) {
      let idAlreadyExists = this.item.roleIds?.some(
        (id) => event.target.value == id
      );
      if (!idAlreadyExists) {
        this.item.roleIds?.push(event.target.value);
      }
    } else {
      this.item.roleIds = this.item.roleIds?.filter(
        (id) => id != event.target.value
      );
    }
    console.log(this.item.roleIds);
  }

  onSubmit() {
    if (this.item.id) {
      // updateOne
      this.baseService.updateOne(basePath, this.item).subscribe(
        (data: any) => {
          this.item = data;
          this.item.password = '';
          // if want to change password, enter new password
          // else, leave it blank
        },
        (err: any) => {
          this.errorMessage = err.message;
        }
      );
    } else {
      // createOne
      this.baseService.createOne(basePath, this.item).subscribe(
        (data: any) => {
          this.item = data;
          let id = this.item.id || '0';
          // reload to the update page
          window.location.href = window.location.href.replace(
            'new',
            id?.toString()
          );
        },
        (err: any) => {
          this.errorMessage = err.message;
        }
      );
    }
  }

  back(): void {
    this._location.back();
  }
}
