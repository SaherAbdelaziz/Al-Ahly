import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SecurityService } from './security.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   *
   */
  constructor(private securityService: SecurityService, private router: Router) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    let claimType: string = route.data["claimType"];

    if (this.securityService.securityObject.isAuthenticated )//&& this.securityService.hasClaim(claimType))
      return true;
    else {
      this.router.navigate(['Login'],
        { queryParams: { returnUrl: state.url } });
      return false;
    }
  }

}
