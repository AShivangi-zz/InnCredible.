import { Component, OnInit } from '@angular/core';
import {UserProfileService} from '../../services/profile.service';
@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})
export class RewardsComponent implements OnInit {

  submit: boolean = false;

  constructor(private userProfileService: UserProfileService) { }

  ngOnInit() {
  }


  redeemPoints(redeem: boolean): void {
    this.userProfileService.isRedeem = redeem;
    this.submit = true;
  }

}
