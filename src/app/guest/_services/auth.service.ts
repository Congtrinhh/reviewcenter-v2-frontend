import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AppConstants } from '../_common/app.constants';
import { RegistrationRequestForm } from '../_models/registration-request-form';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
};

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

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
