import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from '../_models/login-request.model';
import { AppConstants } from 'src/app/guest/_common/app.constants';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  processLogin(loginRequest: LoginRequest): Observable<any> {
    return this.http.post(AppConstants.AUTH_API + 'signin', loginRequest);
  }
}
