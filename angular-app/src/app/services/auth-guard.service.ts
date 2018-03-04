import {CanActivate, Router} from '@angular/router';
import {AngularFireAuth} from 'angularfire2/auth';
import {Injectable} from "@angular/core";
import * as firebase from 'firebase/app';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/take';

@Injectable()

export class AuthGuard implements CanActivate {

    constructor(private afAuth: AngularFireAuth, private router: Router) { }

    canActivate(): Observable<boolean> {
        return this.afAuth.authState
            .take(1)
            .map(authState => !!authState)
            .do(authenticated => {
                if (!authenticated) {
                    this.router.navigate(['/login']);
                }
        });
    }
}