import { Observable } from 'rxjs';
import { AppConstants } from './../../guest/_common/app.constants';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const API_URL = AppConstants.API_ADMIN_BASE_URL;

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class BaseService {
  constructor(private http: HttpClient) {}

  getAll(pathName: string): Observable<any> {
    return this.http.get(API_URL + pathName, httpOptions);
  }

  getOne(pathName: string, id: number): Observable<any> {
    return this.http.get(`${API_URL}${pathName}/${id}`, httpOptions);
  }

  updateOne(pathName: string, payload: any): Observable<any> {
    return this.http.put(API_URL + pathName, payload, httpOptions);
  }
}
