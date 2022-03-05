import { Injectable } from '@angular/core';
import { UserInfo } from '../guest/_models/user-info';

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

@Injectable({
  providedIn: 'root',
})
export class TokenStorageService {
  constructor() {}

  signOut(): void {
    window.localStorage.clear();
    this.setLoggedIn(false);
  }

  saveToken(token: string): void {
    window.localStorage.removeItem(TOKEN_KEY);
    window.localStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string {
    return localStorage.getItem(TOKEN_KEY)!;
    // question mark at the end: tell the compiler that the expression can't be null
  }

  public saveUser(user: UserInfo): void {
    window.localStorage.removeItem(USER_KEY);
    window.localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): UserInfo {
    return JSON.parse(localStorage.getItem(USER_KEY)!);
  }

  public isLoggedIn(): boolean {
    return JSON.parse(localStorage.getItem('isLoggedIn')!);
  }

  public setLoggedIn(value: boolean): void {
    window.localStorage.setItem('isLoggedIn', JSON.stringify(value));
  }
}
