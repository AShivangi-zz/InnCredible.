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
}

@Injectable()

export class AuthService {
  user: Observable<User>;

 constructor(private afAuth: AngularFireAuth,
  private db : AngularFireDatabase,
  private router: Router,
  private location: Location){}

  emailSignUp(email: string, password: string, firstname: string, lastname:string) {
    return this.afAuth.auth.createUserWithEmailAndPassword(email, password)
      .then(user => {
        //Put user data in firebase
        firebase.database().ref('users/' + user.uid).set({
          firstname: firstname,
          lastname: lastname,
          email: email,
          photoURL: 'https://goo.gl/Fz9nrQ',
          rewardPoints: 0
        });
        //this.router.navigateByUrl('/home');
        //location.reload();
        this.location.back();
      })
      .catch(error => this.handleError(error) );
  }



  // Update properties on the user document
  updateUser(user: User, data: any) {
    this.db.object('users/' + user.uid).update(data)
  }

  // If error, console log and notify user
  private handleError(error) : boolean{
    console.error(error)
    return true
    //this.notify.update(error.message, 'error')
  }
}
