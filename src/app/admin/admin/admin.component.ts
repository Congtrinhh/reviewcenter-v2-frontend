import { UserInfo } from './../../guest/_models/user-info';
import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from 'src/app/_services/token-storage.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent implements OnInit {
  user!: UserInfo;

  constructor(private tokenService: TokenStorageService) {}

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.user = this.tokenService.getUser();
    }
  }

  logout() {
    this.tokenService.signOut();
    window.location.reload();
  }
}
