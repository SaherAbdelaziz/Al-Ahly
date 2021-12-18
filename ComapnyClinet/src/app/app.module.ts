import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule ,ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { HttpInterceptorModule } from './security/http-interceptor.module';
import { LoginComponent } from './security/login/login.component';
import { SecurityService } from './security/security.service';
import { NgWizardModule, NgWizardConfig, THEME } from 'ng-wizard';
import { WizardDetailsComponent } from './home/wizard-details/wizard-details.component';
import { MatTabsModule } from '@angular/material/tabs';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';






const ngWizardConfig: NgWizardConfig = {
  theme: THEME.default
};
@NgModule({
  declarations: [
    AppComponent,
    NavMenuComponent,
    HomeComponent,
    LoginComponent,
    WizardDetailsComponent,
  ],
  imports: [
    NgWizardModule.forRoot(ngWizardConfig),
    MatTabsModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule,
    BrowserModule.withServerTransition({ appId: 'ng-cli-universal' }),
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    AppRoutingModule,
    HttpInterceptorModule
    
  ],
  providers: [
    SecurityService,],
  bootstrap: [AppComponent]
})
export class AppModule { }
