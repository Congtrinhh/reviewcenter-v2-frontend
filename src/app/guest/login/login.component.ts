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
  errorMessage: string = '';

  currentUser!: UserInfo;

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
      this.currentUser = this.tokenStorageService.getUser();
      if (!this.currentUser) {
        this.errorMessage = "login failed, can't get user"
        this.tokenStorageService.setLoggedIn(false);
      }
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
            this.tokenStorageService.setLoggedIn(false);
          }
        )
        .add(() => {
          this.showLoader = false;
        });
    } else if (error) {
      this.errorMessage = error;
      this.tokenStorageService.setLoggedIn(false);
    }
  }

  login(user: UserInfo): void {
    this.tokenStorageService.saveUser(user);
    this.currentUser = this.tokenStorageService.getUser();
    if (this.currentUser){
      this.tokenStorageService.setLoggedIn(true);
    }

    const previousUrl = window.localStorage.getItem('previousUrl');
    if (previousUrl) {
      this.router.navigateByUrl(previousUrl);
      window.localStorage.setItem('previousUrl', '');
    } else {
      this.router.navigateByUrl('');
    }
  }

  back() {
    this._location.back();
  }
}
