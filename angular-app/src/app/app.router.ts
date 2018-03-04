import {ModuleWithProviders} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

//import { itemsListComponent } from './items/items-list/items-list.component';
//import { ReadmePageComponent } from './ui/readme-page/readme-page.component';
//import { NotesListComponent } from './notes/notes-list/notes-list.component';

import {AppComponent} from './app.component';
import {LoginComponent} from './login/login.component';
import {RegisterComponent} from './register/register.component';
import {AuthGuard} from './auth-guard.service';
import {HomeComponent} from './home/home.component';
import {ProfileComponent} from './profile/profile.component';

export const router: Routes = [
    {path: '', redirectTo: 'home', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'home', component: HomeComponent},
    {path: 'profile', component: ProfileComponent}
]

export const routes: ModuleWithProviders = RouterModule.forRoot(router);
