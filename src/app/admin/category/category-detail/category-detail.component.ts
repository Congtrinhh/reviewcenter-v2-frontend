import { BaseAdminService } from '../../_services/base-admin.service';
import { Category } from './../../_models/category.model';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';

const basePath = 'categories';

@Component({
  selector: 'app-category-detail',
  templateUrl: './category-detail.component.html',
  styleUrls: ['./category-detail.component.scss'],
})
export class CategoryDetailComponent implements OnInit {
  item: Category = {};

  errorMessage = '';

  createMode = false;

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
      this.item = { enabled: 'true' };
    } else {
      // update
      this.createMode = false;
      let id: any = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
      id = Number(id);
      this.baseService.getOne(basePath, id).subscribe(
        (data: Category) => {
          this.item = data;
        },
        (error: any) => {
          this.errorMessage = error.error;
        }
      );
    }
  }

  onSubmit() {
    if (this.item.id) {
      // updateOne
      this.baseService.updateOne(basePath, this.item).subscribe(
        (data: any) => {
          this.item = data;
        },
        (err: any) => {
          this.errorMessage = err.error;
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
          this.errorMessage = err.error;
        }
      );
    }
  }

  back(): void {
    this._location.back();
  }
}
