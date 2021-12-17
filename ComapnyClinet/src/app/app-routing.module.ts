import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './security/auth.guard';
import { LoginComponent } from './security/login/login.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  {
    path: 'Employees',
    component: HomeComponent,
    canActivate: [AuthGuard],
    data: { isAuthorized: 'isAuthenticated' }
  },
  {
    path: 'Departments', component: HomeComponent,
    canActivate: [AuthGuard],
    data: { isAuthorized: 'isAuthenticated' }
  },
  { path: 'Login', component: LoginComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
