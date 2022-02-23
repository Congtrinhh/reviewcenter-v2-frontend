import { UserInfo } from './../guest/_models/user-info';
import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';

const ADMIN_ROLES = ['admin', 'ROLE_ADMIN', 'ROLE_MODERATOR', 'moderator'];
const USER_ROLES = ['user', 'ROLE_USER'];
@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  private currentUser!: UserInfo;
  constructor(
    private tokenStorageService: TokenStorageService,
    private router: Router
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    if (state.url.startsWith('/admin')) {
      console.log('want admin');
      if (this.hasRequiredRole(ADMIN_ROLES)) {
        return true;
      } else {
        this.router.parseUrl('/admin-login');
        return false;
      }
    } else if (state.url.startsWith('/review')) {
      console.log('want user');
      if (this.hasRequiredRole(USER_ROLES)) {
        return true;
      } else {
        this.router.navigate(['/login']);
        return false;
      }
    }

    return true;
  }
  hasRequiredRole(validRoles: string[]): boolean {
    this.currentUser = this.tokenStorageService.getUser();
    if (!this.currentUser) {
      return false;
    } else {
      let hasRole = this.currentUser.roles?.some((role) =>
        validRoles.includes(role)
      );
      if (hasRole) {
        return true;
      }
    }
    return false;
  }
}
