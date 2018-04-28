import { CanActivate, Router } from '@angular/router';
import { AngularFireAuth } from 'angularfire2/auth';
import { Injectable } from "@angular/core";
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';
import { Location } from '@angular/common';

@Injectable()
export class LoginRegGuard implements CanActivate {

    constructor(private afAuth: AngularFireAuth, private router: Router, private location: Location) { }

    canActivate(): Observable<boolean> {
        return this.afAuth.authState.map(auth => {
            if (auth) {
                this.location.back();
                if (document.referrer === 'http://localhost:4200/home' || document.referrer === 'https://www.inn-credible.com/home') {
                    window.location.reload();
                }
                return false;
            }
            return true;
        });
    }
}