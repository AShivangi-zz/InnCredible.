import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import { UserProfileService } from './services/profile.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  authenticated: boolean;

  constructor(public afa: AngularFireAuth, private router: Router, public userProfileService: UserProfileService) {
    this.afa.authState.subscribe(auth => {
      if (auth) {
        // this.name = auth;
        userProfileService.getUserInfo();
        this.authenticated = true;
      }
      else {
        this.authenticated = false;
      }
    });

  }
}
