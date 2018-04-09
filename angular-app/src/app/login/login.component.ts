import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  state: string = '';
  error: any;

  email: string;
  password: string;

  constructor(public auth: AuthService, private router: Router, private location: Location) {}

  onSubmit(formData) {
    if (formData.valid) {
      this.auth.afAuth.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password)
        .then((success) => {
          this.location.back();
        }).catch( (err) => {
            this.error = err;
          });
  }
}

ngOnInit() : void {
  this.auth.afAuth.authState.subscribe(auth => {
    if (auth) {
      this.router.navigateByUrl('/home');
    }
  });
}

}
