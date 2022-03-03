import { DetailRate } from './../_models/detail-rate.model';
import { CenterDetailGuestService } from './../_services/center-detail-guest.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Center } from 'src/app/admin/_models/center.model';
import { AppConstants } from '../_common/app.constants';
import { Comment } from '../_models/comment.model';
import { RateInfoBox } from '../_models/rate-info-box.model';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-center-detail-guest',
  templateUrl: './center-detail-guest.component.html',
  styleUrls: ['./center-detail-guest.component.scss'],
})
export class CenterDetailGuestComponent implements OnInit {
  center: Center = {};

  errorMessage = '';

  rate: RateInfoBox = {};

  comments: Comment[] = [];

  currentPage = 1;
  totalItems = 0;
  itemsPerPage = AppConstants.PAGE_SIZE_USER;

  searchTerms: any = {};

  base64Prefix = AppConstants.BASE64_IMG_PREFIX;

  isLoggedIn = false;
  openReviewBox = false;

  constructor(
    private activatedRoute: ActivatedRoute,
    private centerService: CenterDetailGuestService,
    private tokenService: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    let currentUser = this.tokenService.getUser();
    if (currentUser) {
      this.isLoggedIn = true;
    }

    const slug = this.activatedRoute.snapshot.paramMap.get('slug');
    if (!slug) {
      return;
    }

    this.centerService.getAllDetail('centers/' + slug).subscribe(
      (data) => {
        console.log(data);
        this.center = data.center.center;
        this.comments = data.comment.comments;
        this.rate = data.rate.rate;
        this.currentPage = data.comment.currentPage;
        this.totalItems = data.comment.totalItems;
      },
      (error) => {
        this.errorMessage = error.error;
      }
    );
  }

  handlePageChange(newPage: number): void {
    this.currentPage = newPage - 1;
    this.searchTerms.size = this.itemsPerPage;
    this.searchTerms.page = this.currentPage;
    this.searchTerms.centerId = this.center.id;

    this.centerService
      .getComments('centers/comments', this.searchTerms)
      .subscribe(
        (data) => {
          console.log(data);
        },
        (error) => {
          this.errorMessage = error.error;
        }
      );
  }

  handleGiveARateClicked() {
    if (!this.isLoggedIn) {
      console.log(this.router.url);
      window.localStorage.setItem('previousUrl', this.router.url);

      this.router.navigate(['/login']);
    }
    this.openReviewBox = true;
  }

  closeReviewBox() {
    this.openReviewBox = false;
  }

  getRatePercent(detailRate: DetailRate): number {
    if (!detailRate.totalRatedTimes) {
      return 0;
    }
    if (!this.rate.totalRateTimes) {
      return 0;
    }
    return Math.round(
      (100 * detailRate.totalRatedTimes) / this.rate.totalRateTimes
    );
  }
}
