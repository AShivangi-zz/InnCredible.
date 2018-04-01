import { Component, OnInit } from '@angular/core';
import {UserProfileService} from '../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  public buttonDisabled: boolean;

  constructor(public userProfileService: UserProfileService) {
  }

  ngOnInit() {
  }

}
