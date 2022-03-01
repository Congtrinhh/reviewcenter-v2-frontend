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
      if (this.hasRequiredRole(ADMIN_ROLES)) {
        return true;
      }
      return this.router.parseUrl('/admin-login');
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
