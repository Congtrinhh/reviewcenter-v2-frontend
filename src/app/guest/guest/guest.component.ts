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
    this.isLoggedIn = this.tokenStorageService.isLoggedIn() == true;

    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
      if (!this.user) {
        this.tokenStorageService.setLoggedIn(false);
        this.isLoggedIn = false;
      }
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    this.isLoggedIn = false;
  }
}
