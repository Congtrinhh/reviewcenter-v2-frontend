import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/admin/_models/user.model';
import { TokenStorageService } from 'src/app/_services/token-storage.service';
import { UserInfo } from '../_models/user-info';
import { UserService } from '../_services/user.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss'],
})
export class GuestComponent implements OnInit {
  isLoggedIn = false;
  user!: UserInfo;

  constructor(
    private tokenStorageService: TokenStorageService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken(); // if token exists, then true

    // const token = this.tokenStorageService.getToken();
    // if (token) {
    //   this.userService.getCurrentUser().subscribe((data: UserInfo) => {
    //     this.user = data;
    //     this.isLoggedIn = true;
    //   }, error => {
    //     this.isLoggedIn = false;
    //   });
    // } else {
    //   this.isLoggedIn = false;
    // }

    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
