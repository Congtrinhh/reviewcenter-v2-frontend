import { AppConstants } from 'src/app/guest/_common/app.constants';
import { Observable, of } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API_URL = AppConstants.API_URL; // /api

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(private http: HttpClient) {}

  getAll(uri: string, searchTermsObject: any): Observable<any> {
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

  getOne(uri: string, id: number): Observable<any> {
    return this.http.get(`${API_URL}${uri}/${id}`, httpOptions);
  }

  updateOne(uri: string, payload: any): Observable<any> {
    return this.http.put(API_URL + uri, payload, httpOptions);
  }

  deleteOne(uri: string, id: number): Observable<any> {
    return this.http.delete(`${API_URL}${uri}/${id}`, httpOptions);
  }

  createOne(uri: string, payload: any): Observable<any> {
    return this.http.post(API_URL + uri, payload, httpOptions);
  }

  search(key: string): Observable<any> {
    if (!key) {
      return of([]);
    }
    return this.http.get(`${API_URL}search?key=${key}`, httpOptions);
  }
}
