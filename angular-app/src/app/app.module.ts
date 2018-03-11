import{environment} from './../environments/environment'

import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';

//Routes
import { routes } from './app.router';

//Firebase
import{AngularFireModule} from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

//Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './contact/contact.component';

//Services
import { AuthGuard } from './services/auth-guard.service';
import {AuthService} from './services/auth.service';
import {UserProfileService} from './services/profile.service';
import { PolicyComponent } from './policy/policy.component';
import { SearchresultComponent } from './searchresult/searchresult.component';
import { SharedSearchResultsService} from './services/shared-search-results.service';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ProfileComponent,
    ContactComponent,
    PolicyComponent,
    SearchresultComponent
  ],
  imports: [
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    routes
  ],
  providers:
    [AuthGuard,
     AuthService,
     UserProfileService,
      SharedSearchResultsService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
