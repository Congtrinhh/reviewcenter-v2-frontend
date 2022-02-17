import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { CategoryModel } from '../_models/category-model';
import { BaseService } from '../_services/base.service';
import { Location } from '@angular/common';

/**
 * parent component
 */
const pathName = 'categories';
@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss'],
})
export class CategoryComponent implements OnInit {
  showDetailView = false; // show details information of item (create-update page)
  showConfirmDeleteView = false;
  errorMessage = '';

  items: CategoryModel[] = [];
  totalPages = 0;
  currentPage = 0; // zero based

  item!: CategoryModel;

  constructor(private baseService: BaseService, private _location: Location) {}

  ngOnInit(): void {
    const currentUrl = window.location.href;

    if (currentUrl.endsWith(pathName) || currentUrl.endsWith(pathName + '/')) {
      // getAll
      this.baseService.getAll(pathName).subscribe(
        (data: any) => {
          console.log(data);
          this.items = data.categories;
          this.showDetailView = false;
        },
        (error) => {
          this.errorMessage = error.error.message;
        }
      );
    } else {
      // getOne
      let id: any = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
      id = Number(id);
      this.baseService.getOne(pathName, id).subscribe(
        (data: CategoryModel) => {
          this.item = data;
          this.showDetailView = true;
        },
        (error: any) => {
          this.errorMessage = error;
        }
      );
    }
  }

  onSubmit() {
    this.baseService.updateOne(pathName, this.item).subscribe(
      (data: any) => {
        this.item = data;
        this.showDetailView = true;
      },
      (err: any) => {
        this.errorMessage = err;
      }
    );
  }

  back(): void {
    this._location.back();
  }

  onOpenConfirmDeleteView() {
    this.showConfirmDeleteView = true;
  }

  onCloseConfirmDeleteView() {
    this.showConfirmDeleteView = false;
  }
}
