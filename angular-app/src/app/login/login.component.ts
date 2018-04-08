import { Component, OnInit } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import * as firebase from 'firebase';
import { UserProfileService } from "../services/profile.service";
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

  constructor(public afa: AngularFireAuth, private router: Router, private location: Location, private auth: AuthService) { }

  signInWithGoogle() {
    return this.afa.auth.signInWithPopup(
      new firebase.auth.GoogleAuthProvider()
    )
  }

  public onClick() {

    // Create a Google Provider
    var provider = new firebase.auth.GoogleAuthProvider();
    provider.addScope('profile');
    provider.addScope('email');

    // Sign In With the given provider (Google in this case)
    firebase.auth().signInWithPopup(provider).then(function (result) {
      var token = result.credential.accessToken; // Not used
      var user = result.user; // Not used
      console.log(user.email); // Testing to display email
      console.log(user.displayName)// Testing to disiplay name

      var names = user.displayName; // Not used

      var splitname = names.split(" "); // Not used
      //console.log(splitname[0]);

      //this.ups.updateName(splitname[0], splitname[1]);


      console.log(token);
      console.log(user);

      //firebase.auth().signInWithCredential(result.credential);
      //this.router.navigateByUrl('/home');
      window.location.reload();
    }).catch(function (error) {
      var errorCode = error.code;
      var errorMessage = error.message;
      var email = error.email;
      var credential = error.credential;

      console.log(errorCode);
    }

    );
  }



  onSubmit(formData) {
    if (formData.valid) {
      this.auth.afAuth.auth.signInWithEmailAndPassword(formData.value.email, formData.value.password)
        .then((success) => {
          this.location.back();
        }).catch((err) => {
          this.error = err;
        });
    }
  }

  ngOnInit(): void {
    this.auth.afAuth.authState.subscribe(auth => {
      if (auth) {
        this.router.navigateByUrl('/home');
      }
    });
  }

}
