import { Role } from './../_models/role.model';
import { Component, OnInit } from '@angular/core';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { User } from '../_models/user.model';
import { BaseAdminService } from '../_services/base-admin.service';

const basePath = 'users';
const roleBasePath = 'roles';
@Component({
  selector: 'app-user-detail-reactive-form',
  templateUrl: './user-detail-reactive-form.component.html',
  styleUrls: ['./user-detail-reactive-form.component.scss'],
})
export class UserDetailReactiveFormComponent implements OnInit {
  item!: User;

  form!: FormGroup;

  createMode = false;
  errorMessage = '';

  roles: Role[] = [];

  constructor(private fb: FormBuilder, private baseService: BaseAdminService) {}

  ngOnInit(): void {
    const currentUrl = window.location.href;
    if (
      currentUrl.endsWith(basePath + '/new') ||
      currentUrl.endsWith(basePath + '/new/')
    ) {
      // create
      this.form = this.fb.group({
        id: '',
        email: ['', [Validators.required, Validators.email]],
        displayName: ['', Validators.required],
        password: ['', [Validators.required, Validators.minLength(6)]],
        provider: '',
        avatarUrl: '',
        enabled: true,
        createdDate: '',
        modifiedDate: '',
        roleIds: this.fb.array([], Validators.required),
      });

      this.createMode = true;
      this.baseService.getAll(roleBasePath, null).subscribe(
        (data: any) => {
          this.roles = data.roles;
        },
        (error: any) => {}
      );
    } else {
      // update
      this.createMode = false;
      let id: any = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
      id = Number(id);
      this.baseService.getOne(basePath, id).subscribe(
        (data: User) => {
          this.form = this.fb.group({
            id: data.id,
            email: [data.email, [Validators.required, Validators.email]],
            displayName: [data.displayName, Validators.required],
            password: [''],
            provider: data.provider,
            avatarUrl: data.avatarUrl,
            enabled: data.enabled,
            createdDate: data.createdDate,
            modifiedDate: data.modifiedDate,
            roleIds: this.fb.array(<string[]>data.roleIds, Validators.required),
          });
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

  handleSubmit() {
    const id = this.form.get('id')?.value;
    if (!id) {
      // create
      this.baseService.createOne(basePath, this.form.value).subscribe(
        (data) => {
          this.createMode = false;
          window.location.href = 'admin/users/' + data.id;
        },
        (error) => {
          this.errorMessage = error.message;
        }
      );
    } else {
      this.baseService.updateOne(basePath, this.form.value).subscribe(
        (data) => {
          window.location.reload();
        },
        (error) => {
          this.errorMessage = error.message;
        }
      );
    }
  }

  handleRoleCheckboxClicked(event: any, roleId: any) {
    let roleIdsArray = this.form.get('roleIds') as FormArray;

    if (event.target.checked) {
      let alreadyExists = roleIdsArray.value.some((id: any) => id == roleId);
      if (!alreadyExists) {
        roleIdsArray.push(this.fb.control(roleId));
      }
    } else {
      const newArray = roleIdsArray.value.filter((id: any) => id !== roleId);
      this.form.setControl(
        'roleIds',
        this.fb.array(newArray, Validators.required)
      );
    }
  }

  get roleIds() {
    return this.form.get('roleIds') as FormArray;
  }

  get email() {
    return this.form.get('email');
  }

  get formControls() {
    return this.form.controls;
  }
}
