import { Component, OnInit } from '@angular/core';
import {UserProfileService} from '../services/profile.service';
import { Reservation } from '../booking/shared/reservation.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public reservations: Reservation[];
  constructor(private userProfileService: UserProfileService) {
  }

  ngOnInit() {
    this.pullReservations();
  }

  public async pullReservations(){

    var prom = await this.userProfileService.getReservations();
    this.reservations = this.userProfileService.reservation;
    let numRes = this.reservations.length;
    for(let i = 0; i < numRes; i++)
      {
        var num = i.toString();
        console.log("Hotel iD:" + this.reservations[num].hotelID);
      }
  }
  

}
