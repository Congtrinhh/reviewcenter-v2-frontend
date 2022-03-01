import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AppConstants } from 'src/app/guest/_common/app.constants';
import { Injectable } from '@angular/core';

const API_URL = AppConstants.API_URL; // /api

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
@Injectable({
  providedIn: 'root',
})
export class ReviewBoxService {
  constructor(private http: HttpClient) {}

  createOne(uri: string, payload: any): Observable<any> {
    return this.http.post(API_URL + uri, payload);
  }
}
