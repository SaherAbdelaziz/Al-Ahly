import { Component } from '@angular/core';
import { AppUserAuth } from '../security/app-user-auth';
import { SecurityService } from '../security/security.service';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.css']
})
export class NavMenuComponent {
  securityObject: AppUserAuth = new AppUserAuth();
  isExpanded = false;
  /**
   *
   */
  constructor(private securityService: SecurityService) {
    this.securityService.securityObject = this.securityObject ;
  }
  collapse() {
    this.isExpanded = false;

  }

  toggle() {
    this.isExpanded = !this.isExpanded;
  }

  logout() {
    this.securityService.logout()
  }
}
