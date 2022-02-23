import { Component, OnInit } from '@angular/core';
import { UserInfo } from 'src/app/guest/_models/user-info';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { LoginRequest } from '../_models/login-request.model';
import { LoginService } from '../_services/login.service';

@Component({
  selector: 'app-login-admin',
  templateUrl: './login-admin.component.html',
  styleUrls: ['./login-admin.component.scss'],
})
export class LoginAdminComponent implements OnInit {
  loginRequest: LoginRequest = {};
  errorMessage = '';

  isLoggedIn: boolean = false;
  isLoginFailed: boolean = false;
  currentUser: any;

  constructor(
    private loginService: LoginService,
    private tokenStorage: TokenStorageService
  ) {}

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorage.getUser();
    } else {
      this.errorMessage = 'please login';
    }
  }

  login(user: UserInfo): void {
    this.tokenStorage.saveUser(user);
    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.currentUser = this.tokenStorage.getUser();
    window.location.href = 'admin';
  }

  handleFormSubmit() {
    this.loginService.processLogin(this.loginRequest).subscribe(
      (data) => {
        this.tokenStorage.saveToken(data.accessToken);
        this.login(data.user);
      },
      (err) => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }
}
