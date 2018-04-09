import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/profile.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  newName: boolean = false;
  newPassword: boolean = false;
  newEmail: boolean = false;
  changePic: boolean = false;

  constructor(public userProfileService: UserProfileService) { }

  ngOnInit() {
    this.userProfileService.getUserInfo();
  }
  

}
