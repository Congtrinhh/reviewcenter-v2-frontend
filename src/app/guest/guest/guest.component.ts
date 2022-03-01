import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/admin/_models/user.model';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-guest',
  templateUrl: './guest.component.html',
  styleUrls: ['./guest.component.scss'],
})
export class GuestComponent implements OnInit {
  isLoggedIn = false;
  user!: User;

  constructor(private tokenStorageService: TokenStorageService) {}

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken(); // if token exists, then true

    if (this.isLoggedIn) {
      this.user = this.tokenStorageService.getUser();
    }
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }
}
