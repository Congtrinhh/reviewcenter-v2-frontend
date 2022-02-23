import { BaseAdminService } from '../../_services/base-admin.service';
import { Component, OnInit } from '@angular/core';
import { AppConstants } from 'src/app/guest/_common/app.constants';
import { Role } from '../../_models/role.model';
import { Location } from '@angular/common';

const basePath = 'roles';
@Component({
  selector: 'app-role-list',
  templateUrl: './role-list.component.html',
  styleUrls: ['./role-list.component.scss'],
})
export class RoleListComponent implements OnInit {
  searchTerms: any = {};
  items: Role[] = [];

  itemsPerPage = AppConstants.PAGE_SIZES_ADMIN[0];
  currentPage = 1;
  totalItems = 0;

  errorMessage = '';

  pageSizes = AppConstants.PAGE_SIZES_ADMIN;

  showConfirmDeleteView = false;
  currentSelectedItemId = 0;

  constructor(
    private baseService: BaseAdminService,
    private _location: Location
  ) {}

  ngOnInit(): void {
    // get all
    this.retrieveItems(basePath, null);
  }

  onSearchButtonClick() {
    this.retrieveItems(basePath, this.searchTerms);
  }

  handlePageSizeChange() {
    this.searchTerms.size = this.itemsPerPage;
    this.retrieveItems(basePath, this.searchTerms);
  }

  handlePageChange(newPage: number) {
    this.searchTerms.page = newPage - 1;
    this.retrieveItems(basePath, this.searchTerms);
  }

  handleSelectItemToDelete(id: any) {
    id = Number(id);
    this.showConfirmDeleteView = true;
    this.currentSelectedItemId = id;
  }

  handleDelete() {
    this.showConfirmDeleteView = false;
    this.baseService.deleteOne(basePath, this.currentSelectedItemId).subscribe(
      (data: any) => {
        this.searchTerms.page = 0; // reset page
        this.retrieveItems(basePath, this.searchTerms);
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  hideConfirmDeleteView() {
    this.showConfirmDeleteView = false;
  }

  resetSearchForm() {
    // keep only pageIndex and size
    this.searchTerms = {
      page: this.searchTerms.page | 0,
      size: this.searchTerms.size | this.itemsPerPage,
    };
    this.retrieveItems(basePath, this.searchTerms);
  }

  retrieveItems(basePath: string, searchTermsObject: any): void {
    this.baseService.getAll(basePath, searchTermsObject).subscribe(
      (data: any) => {
        const { itemsPerPage, currentPage, totalItems } = data;
        this.itemsPerPage = itemsPerPage;
        this.currentPage = currentPage + 1;
        this.totalItems = totalItems;

        this.items = data.roles;
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }

  back(): void {
    this._location.back();
  }
}
