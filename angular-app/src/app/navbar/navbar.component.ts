import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  //name: any;
  authenticated: boolean;

  constructor(public afa: AngularFireAuth, private router: Router) {
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

  }

  logout() {
    this.afa.auth.signOut();
    location.reload();
  }

}
