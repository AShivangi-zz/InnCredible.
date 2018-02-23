import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  state: string = '';
  error: any;

  constructor(public afa: AngularFireAuth, private router: Router) { 
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
          this.router.navigateByUrl('/home')
          location.reload();
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
