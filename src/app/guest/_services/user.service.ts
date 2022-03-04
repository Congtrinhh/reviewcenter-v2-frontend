import { UserInfo } from './../_models/user-info';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AppConstants } from '../_common/app.constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  // for social login - get currently authenticated user from server context
  getCurrentUser(): Observable<UserInfo> {
    return this.http.get<UserInfo>(
      AppConstants.API_URL + 'user/me',
      httpOptions
    );
  }
}
