import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import { UserProfileService } from '../services/profile.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  //name: any;
  authenticated: boolean;

  constructor(public afa: AngularFireAuth, private router: Router, public userProfileService: UserProfileService) {
    this.afa.authState.subscribe(auth => {  
      if(auth) {
        //this.name = auth;
        userProfileService.getUserInfo();
        this.authenticated = true;
      }
      else {
        this.authenticated = false;
      }
    });

  }
  

  checkAuth(): void {
    this.afa.authState.subscribe(auth => {  
      if(auth) {
        //this.name = auth;
        this.authenticated = true;
      }
      else {
        this.authenticated = false;
      }
    });
  }

  ngOnInit() {
    this.getUserData();
  }

  logout() {
    this.afa.auth.signOut();
    location.reload();
  }

  async getUserData() {
    await this.userProfileService.getUserInfo();
  }

}
