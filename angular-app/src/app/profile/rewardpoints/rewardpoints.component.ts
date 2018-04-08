import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/profile.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-rewardpoints',
  templateUrl: './rewardpoints.component.html',
  styleUrls: ['./rewardpoints.component.scss']
})
export class RewardpointsComponent implements OnInit {

  constructor(public userProfileService: UserProfileService) { }

  ngOnInit() {
  }

}
