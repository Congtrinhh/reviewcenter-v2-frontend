import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../common/app.constants';
import { BasicLoginRequest } from '../models/basic-login-request';
import { RegistrationRequestForm } from '../models/registration-request-form';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};
/**
 * Thực hiện tính năng signin và signup
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  login(credentials: BasicLoginRequest): Observable<any> {
    return this.http.post(
      AppConstants.AUTH_API + 'signin',
      {
        email: credentials.username,
        password: credentials.password,
      },
      httpOptions
    );
  }

  register(user: RegistrationRequestForm): Observable<any> {
    return this.http.post(
      AppConstants.AUTH_API + 'signup',
      {
        displayName: user.displayName,
        email: user.email,
        password: user.password,
        matchingPassword: user.matchingPassword,
        socialProvider: 'LOCAL',
      },
      httpOptions
    );
  }
}
