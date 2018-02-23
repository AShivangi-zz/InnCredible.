import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  name: any;

  constructor(public afa: AngularFireAuth, private router: Router) {
    this.afa.authState.subscribe(auth => {  
      if(auth) {
        this.name = auth;
      }
    });
  }

  ngOnInit() {

  }

  logout() {
    this.afa.auth.signOut();
    this.router.navigateByUrl("/home");
  }

}
