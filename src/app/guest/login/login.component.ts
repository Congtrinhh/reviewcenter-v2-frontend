import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { AppConstants } from '../_common/app.constants';
import { UserInfo } from '../_models/user-info';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isLoggedIn: boolean = false;
  isLoginFailed: boolean = false;
  errorMessage: string = '';
  currentUser: any;
  googleURL = AppConstants.GOOGLE_AUTH_URL;
  facebookURL = AppConstants.FACEBOOK_AUTH_URL;
  githubURL = AppConstants.GITHUB_AUTH_URL;

  showLoader = false;

  constructor(
    private tokenStorageService: TokenStorageService,
    private route: ActivatedRoute,
    private userService: UserService,
    private _location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    const token: string = this.route.snapshot.queryParamMap.get('token')!;
    const error: string = this.route.snapshot.queryParamMap.get('error')!;

    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.currentUser = this.tokenStorageService.getUser();
    } else if (token) {
      this.tokenStorageService.saveToken(token);

      this.showLoader = true;
      this.userService
        .getCurrentUser()
        .subscribe(
          (data) => {
            this.login(data);
          },
          (err) => {
            this.errorMessage = err.error;
            this.isLoginFailed = true;
          }
        )
        .add(() => {
          this.showLoader = false;
        });
    } else if (error) {
      this.errorMessage = error;
      this.isLoginFailed = true;
    }
  }

  login(user: UserInfo): void {
    this.tokenStorageService.saveUser(user);
    this.isLoginFailed = false;
    this.isLoggedIn = true;
    this.currentUser = this.tokenStorageService.getUser();
    const previousUrl = window.localStorage.getItem('previousUrl');
    if (previousUrl) {
      this.router.navigateByUrl(previousUrl);
    } else {
      this.router.navigateByUrl('');
    }
  }

  back() {
    this._location.back();
  }
}
