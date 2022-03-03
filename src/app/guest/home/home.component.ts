import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/admin/_models/category.model';
import { Center } from 'src/app/admin/_models/center.model';
import { AppConstants } from '../_common/app.constants';
import { RatingNews } from '../_models/rating-news.model';
import { BaseService } from '../_services/base.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  categories: Category[] = [];
  centers: Center[] = [];

  totalItems = 0;
  currentPage = 1;
  itemsPerPage = AppConstants.PAGE_SIZE_USER;

  searchTerms: any = {}; // for searching centers
  errorMessage = '';

  base64Prefix = AppConstants.BASE64_IMG_PREFIX;

  // get trung tam tu moi nhat den cu nhat
  currentCategoryId = '-1';

  todayRatings: RatingNews[] = [];

  constructor(private baseService: BaseService) {}

  ngOnInit(): void {
    this.baseService.getAll('home/all', null).subscribe(
      (data: any) => {
        this.categories = data.category.categories;
        this.centers = data.center.centers;
        this.todayRatings = data.news.todayRatings;

        const { totalItems, currentPage, itemsPerPage } = data.center;
        this.totalItems = totalItems;
        this.currentPage = currentPage;
        this.itemsPerPage = itemsPerPage;
      },
      (error) => {
        this.errorMessage = error.error;
      }
    );
  }

  handlePageChange(newPage: number) {
    this.searchTerms.page = newPage - 1;
    this.retrieveCenters();
  }

  retrieveCenters() {
    this.baseService.getAll('home/centers', this.searchTerms).subscribe(
      (data: any) => {
        this.centers = data.centers;
        const { totalItems, currentPage, itemsPerPage } = data;
        this.totalItems = totalItems;
        this.currentPage = currentPage + 1;
        this.itemsPerPage = itemsPerPage;

        console.log(data);
      },
      (error) => {
        this.errorMessage = error.error;
      }
    );
  }

  handleGetAllCategoriesBtnClicked() {
    this.currentCategoryId = '-1';

    this.searchTerms.categoryId = '';
    this.searchTerms.page = 0; // or 1?
    this.retrieveCenters();
  }

  handleCategoryNameClicked(event: any, id: any) {
    this.currentCategoryId = id;

    this.searchTerms.categoryId = id;
    this.searchTerms.page = 0; // or 1?
    this.retrieveCenters();
  }
}
