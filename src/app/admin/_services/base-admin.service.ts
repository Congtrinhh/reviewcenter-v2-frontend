import { Observable } from 'rxjs';
import { AppConstants } from '../../guest/_common/app.constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL = AppConstants.API_ADMIN_BASE_URL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class BaseAdminService {
  constructor(private http: HttpClient) {}

  getAll(pathName: string, searchTermsObject: any): Observable<any> {
    let queryParams = '';
    if (searchTermsObject && typeof searchTermsObject == 'object') {
      if (!('page' in searchTermsObject)) {
        searchTermsObject.page = 0;
      }
      if (!('size' in searchTermsObject)) {
        searchTermsObject.size = AppConstants.PAGE_SIZES_ADMIN[1];
      }
      queryParams = new URLSearchParams(searchTermsObject).toString();
    }

    return this.http.get(`${API_URL}${pathName}?${queryParams}`, httpOptions);
  }

  getOne(pathName: string, id: number): Observable<any> {
    return this.http.get(`${API_URL}${pathName}/${id}`, httpOptions);
  }

  updateOne(pathName: string, payload: any): Observable<any> {
    return this.http.put(API_URL + pathName, payload, httpOptions);
  }

  deleteOne(pathName: string, id: number): Observable<any> {
    return this.http.delete(`${API_URL}${pathName}/${id}`, httpOptions);
  }

  createOne(pathName: string, payload: any): Observable<any> {
    return this.http.post(API_URL + pathName, payload, httpOptions);
  }
}
