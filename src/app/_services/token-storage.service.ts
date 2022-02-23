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
    window.sessionStorage.clear();
  }

  saveToken(token: string): void {
    window.sessionStorage.removeItem(TOKEN_KEY);
    window.sessionStorage.setItem(TOKEN_KEY, token);
  }

  getToken(): string {
    return sessionStorage.getItem(TOKEN_KEY)!;
    // question mark at the end: tell the compiler that the expression can't be null
  }

  public saveUser(user: UserInfo): void {
    window.sessionStorage.removeItem(USER_KEY);
    window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): UserInfo {
    return JSON.parse(sessionStorage.getItem(USER_KEY)!);
  }
}
