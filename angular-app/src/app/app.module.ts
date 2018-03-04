import{environment} from './../environments/environment'

import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import{AngularFireModule} from "angularfire2";
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFirestore, AngularFirestoreDocument} from 'angularfire2/firestore';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AuthGuard } from './auth-guard.service';
import {AuthService} from './auth.service';
import { routes } from './app.router';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
//import { CommonModules } from
//import { ReactivateFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ProfileComponent
  ],
  imports: [
  //  CommonModules,
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
  providers: [AuthGuard, AuthService, AngularFirestore],
  bootstrap: [AppComponent]
})
export class AppModule { }
