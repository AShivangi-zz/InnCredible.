import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/profile.service';
import { Reservation } from '../../booking/shared/reservation.model';
import { Hotel } from "../../models/hotel";
import { HotelInfo } from '../../services/hotel-info';
import { Booking } from '../../models/booking';
import * as firebase from 'firebase';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent implements OnInit {

  constructor(public userProfileService: UserProfileService, private hotelInfo: HotelInfo) { }

  ngOnInit() {
  }

}
