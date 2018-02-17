import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  state: string = '';
  error: any;

  constructor(public afa: AngularFireAuth, private router: Router) { 

  }

  onSubmit(formData) {
    if(formData.valid) {
      this.afa.auth.createUserWithEmailAndPassword(formData.value.email, formData.value.password)
        .then((success)=> {
          this.router.navigate(['/home'])
        }).catch(
          (err) => {
            this.error = err;
          }
        )
    }
  }

  ngOnInit() {
  }

}
