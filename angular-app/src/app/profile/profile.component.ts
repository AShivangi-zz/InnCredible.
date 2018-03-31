import { Component, OnInit } from '@angular/core';
import {UserProfileService} from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public userProfileService: UserProfileService) {
  }

  ngOnInit() {
  }

}
