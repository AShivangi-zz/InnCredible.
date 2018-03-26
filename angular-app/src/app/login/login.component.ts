import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {Location} from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  state: string = '';
  error: any;

  email: string;
  password: any;

  constructor(public afa: AngularFireAuth, private router: Router, private location: Location) { 
    /*this.afa.authState.subscribe(auth => {
        if(auth) {

        }
        this.router.navigateByUrl('/home');
      });*/
  }

  onSubmit(formData) {
    if(formData.valid) {
      this.afa.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password)
        .then((success)=> {
          //this.router.navigateByUrl('/home');
          this.location.back();
        }).catch(
          (err) => {
            this.error = err;
          }
        )
    }
  }

  ngOnInit() : void {
    this.afa.authState.subscribe(auth => {
      if(auth) {
        this.router.navigateByUrl('/home');
      }
    });
  }

}
