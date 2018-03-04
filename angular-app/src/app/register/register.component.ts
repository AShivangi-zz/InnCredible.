import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { FormGroup, FormBuilder, Validators} from '@angular/forms';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})

export class RegisterComponent implements OnInit {

signupForm: FormGroup;
error: any;

  constructor(private auth: AuthService, private fb: FormBuilder) { }

  ngOnInit() {


    // First Step
    this.signupForm = this.fb.group({
      'firstname': ['', [
        Validators.required
        ]
      ],
      'lastname': ['', [
        Validators.required
        ]
      ],
      'email': ['', [
        Validators.required,
        Validators.email
        ]
      ],
      'password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.required
        ]
      ],
      'confirm_password': ['', [
        Validators.pattern('^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$'),
        Validators.minLength(6),
        Validators.maxLength(25),
        Validators.required
        ]
      ]
     
      
    });
  }
  
  get email() { return this.signupForm.get('email') }
  get password() { return this.signupForm.get('password') }
  get firstname() { return this.signupForm.get('firstname') }
  get lastname() { return this.signupForm.get('lastname') }
  get confirm_password() {return this.signupForm.get('confirm_password')}


  // Step 1
  signup() {

    if(this.password.value === this.confirm_password.value) {
      var err = this.auth.emailSignUp(this.email.value, this.password.value, this.firstname.value, this.lastname.value)
      if(err) {
        this.error = 'The email already exists';
      }
    }
    else {
      this.error = 'Passwords do not match';
    }
  }


  // Step 2
  /*
  setRewardsPoint(user) {
    return this.auth.updateUser(user, { RewardsPoint:  this.RewardsPoint.value })
  }
  */

}
/*import { Component, OnInit } from '@angular/core';
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
          this.router.navigateByUrl('/home')
          location.reload();
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
*/