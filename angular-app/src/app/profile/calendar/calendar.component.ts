import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/profile.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss']
})
export class CalendarComponent implements OnInit {

  constructor(public userProfileService: UserProfileService) { }

  ngOnInit() {
    this.userProfileService.getUserInfo();
  }

}
