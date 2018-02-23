import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

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

}
