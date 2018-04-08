import {CanActivate, Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {Injectable} from "@angular/core";
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { AngularFireDatabase } from 'angularfire2/database';
import {Location} from '@angular/common';
//import {NotifyService} from 

interface User {
  uid: string;
  email: string;
  photoURL: string;
  rewardPoints: any;
  firstname: string; 
  lastname: string;
  streetAddress: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
}

@Injectable()

export class AuthService {
  user: Observable<User>;

 constructor(public afAuth: AngularFireAuth,
  private db : AngularFireDatabase,
  private router: Router,
  private location: Location){}

  async emailSignUp(email: string, password: string, firstname: string, lastname:string) {
    var err;
    var promise = this.afAuth.auth.createUserWithEmailAndPassword(email, password);
    await promise.then(user => {
        err = false;
        firebase.database().ref('users/' + user.uid).set({
          firstname: firstname,
          lastname: lastname,
          email: email,
          photoURL: 'https://goo.gl/Fz9nrQ',
          rewardPoints: 0,
          streetAddress: 'StreetAddress',
          city: 'City',
          state: 'State',
          country: 'Country',
          zipcode: '000000',
        });
        this.location.back();
      })
      .catch(error => {
        err = true;
      });
      return err;   
  }
  
  // Update properties on the user document
  updateUser(user: User, data: any) {
    this.db.object('users/' + user.uid).update(data)
  }
}
