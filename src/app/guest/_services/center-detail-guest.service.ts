import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AppConstants } from 'src/app/guest/_common/app.constants';
import { Injectable } from '@angular/core';

const API_URL = AppConstants.API_URL; // /api

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class CenterDetailGuestService {
  constructor(private http: HttpClient) {}

  getAllDetail(uri: string): Observable<any> {
    return this.http.get(API_URL + uri, httpOptions);
  }

  getComments(uri: string, searchTermsObject: any): Observable<any> {
    let queryParams = '';
    if (searchTermsObject && typeof searchTermsObject == 'object') {
      if (!('page' in searchTermsObject)) {
        searchTermsObject.page = 0;
      }
      if (!('size' in searchTermsObject)) {
        searchTermsObject.size = AppConstants.PAGE_SIZE_USER;
      }
      queryParams = new URLSearchParams(searchTermsObject).toString();
    }
    return this.http.get(`${API_URL}${uri}?${queryParams}`, httpOptions);
  }
}
