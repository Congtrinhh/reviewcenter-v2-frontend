import { AppConstants } from 'src/app/guest/_common/app.constants';
import { Component, OnInit } from '@angular/core';
import { Center } from 'src/app/admin/_models/center.model';
import { BaseService } from '../_services/base.service';
import { Observable, Subject } from 'rxjs';

import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  // items$!: Observable<Center[]>;

  items: Center[] = [];
  private searchingKey = new Subject<string>();

  currentSearchingKey = ''; // for reset

  message = ''; // displayed when search key don't match any items

  base64Prefix = AppConstants.BASE64_IMG_PREFIX;

  constructor(private baseService: BaseService) {}

  ngOnInit(): void {
    this.searchingKey
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe((key) => {
        this.baseService.search(key).subscribe((data) => {
          this.items = data;
          if (this.items.length === 0 && key) {
            this.message = 'No items found';
          } else {
            this.message = '';
          }
        });
      });
  }

  // search with new value
  handleSearch(key: string) {
    this.searchingKey.next(key);
  }

  clearSearchingKey() {
    this.currentSearchingKey = '';
    this.searchingKey.next(this.currentSearchingKey);
  }
}
