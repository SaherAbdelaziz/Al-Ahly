import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppUser } from '../app-user';
import { AppUserAuth } from '../app-user-auth';
import { SecurityService } from '../security.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: AppUser = new AppUser();
  securityObject: AppUserAuth | undefined;
  returnUrl: string | undefined;
  constructor(private securityService: SecurityService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') as string;
  }

  login() {
    this.securityService.login(this.user).subscribe(resp => {
      this.securityObject = resp;
      if (this.returnUrl) {
        this.router.navigateByUrl(this.returnUrl);
      }
      else{
        this.router.navigate(['Home'])
      }
    },
      () => {
        // Initialize security object to display error message
        this.securityObject = new AppUserAuth();
      });
  }

}
