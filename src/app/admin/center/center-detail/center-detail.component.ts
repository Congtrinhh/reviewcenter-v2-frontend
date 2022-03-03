import { CenterService } from './../../_services/center.service';
import { AppConstants } from 'src/app/guest/_common/app.constants';
import { Center } from './../../_models/center.model';
import { BaseAdminService } from '../../_services/base-admin.service';
import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Category } from './../../_models/category.model';
import { Rating } from '../../_models/rating.model';

const basePath = 'centers';
const categoryBasePath = 'categories';
const ratingBasePath = 'ratings';
@Component({
  selector: 'app-center-detail',
  templateUrl: './center-detail.component.html',
  styleUrls: ['./center-detail.component.scss'],
})
export class CenterDetailComponent implements OnInit {
  item: Center = {};

  errorMessage = '';

  createMode = false;

  categories: Category[] = [];
  ratings: Rating[] = [];

  showRatingSection = false;

  // rating pagination props
  itemsPerPage = AppConstants.PAGE_SIZES_ADMIN[0];
  currentPage = 1;
  totalItems = 0;
  showConfirmDeleteView = false;
  currentSelectedRatingId = 0;
  ratingSearchTerms: any = {};

  imageFile: File | null = null;
  base64Prefix = AppConstants.BASE64_IMG_PREFIX;

  constructor(
    private baseService: BaseAdminService,
    private centerService: CenterService,
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
      this.retrieveCategory();
    } else {
      // update
      this.createMode = false;
      let id: any = currentUrl.substring(currentUrl.lastIndexOf('/') + 1);
      id = Number(id);
      this.baseService.getOne(basePath, id).subscribe(
        (data: Center) => {
          this.item = data;
        },
        (error: any) => {
          this.errorMessage = error.error;
        }
      );
      this.retrieveCategory();
    }
  }

  onSubmit() {
    if (this.item.id) {
      // updateOne
      this.centerService
        .updateOne(basePath, this.item, this.imageFile)
        .subscribe(
          (data: any) => {
            this.item = data;
          },
          (err: any) => {
            this.errorMessage = err.error;
          }
        );
    } else {
      // createOne
      console.log(this.item);
      this.centerService
        .createOne(basePath, this.item, this.imageFile)
        .subscribe(
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

  handleShowRatingSection() {
    this.showRatingSection = true;
    this.retrieveRatings();
  }

  handleHideRatingSection() {
    this.showRatingSection = false;
    this.resetRatingPagination();
  }

  handlePageChange(newPage: number) {
    this.ratingSearchTerms.page = newPage - 1;
    this.retrieveRatings();
  }

  handleSelectItemToDelete(id: any) {
    id = Number(id);
    this.showConfirmDeleteView = true;
    this.currentSelectedRatingId = id;
  }

  handleDelete() {
    this.showConfirmDeleteView = false;
    this.baseService
      .deleteOne(basePath, this.currentSelectedRatingId)
      .subscribe(
        (data: any) => {
          this.ratingSearchTerms.page = 0; // reset page
          this.retrieveRatings();
        },
        (error) => {
          this.errorMessage = error.error;
        }
      );
  }

  // file
  handleImageFileChange(event: any) {
    let file = event.target.files[0];
    let fileExtension = file.type.split('/').pop();
    console.log(fileExtension);

    let isExtensionValid = AppConstants.PERMITTED_IMG_EXTENSIONS.some(
      (ext) => ext == fileExtension
    );
    if (isExtensionValid) {
      this.imageFile = file;
    } else {
      event.target.value = null;
    }
  }

  retrieveRatings(): void {
    this.ratingSearchTerms.centerId = this.item.id;
    this.baseService.getAll(ratingBasePath, this.ratingSearchTerms).subscribe(
      (data: any) => {
        const { itemsPerPage, currentPage, totalItems } = data;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = currentPage + 1;
        this.totalItems = totalItems;

        this.ratings = data.ratings;
      },
      (error) => {
        this.errorMessage = error.error;
      }
    );
  }

  resetRatingPagination() {
    this.ratings = [];
    this.currentPage = 1;
    this.totalItems = 0;
  }

  hideConfirmDeleteView() {
    this.showConfirmDeleteView = false;
  }

  retrieveCategory() {
    this.baseService.getAll(categoryBasePath, null).subscribe(
      (data: any) => {
        this.categories = data.categories;
      },
      (error: any) => {
        this.errorMessage = error.error;
      }
    );
  }

  back(): void {
    this._location.back();
  }
}
