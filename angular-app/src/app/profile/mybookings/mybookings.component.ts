import { Component, OnInit, Pipe, PipeTransform} from '@angular/core';
import { UserProfileService } from '../../services/profile.service';
import { Reservation } from '../../booking/shared/reservation.model';
import { Hotel } from "../../models/hotel";
import { HotelInfo } from '../../services/hotel-info';
import { Booking } from '../../models/booking';
import * as firebase from 'firebase';

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.scss']
})

@Pipe({
  name: 'reverse'
})


export class MybookingsComponent implements OnInit, PipeTransform {

  transform(value) {
      if (!value) return;

      return value.reverse();
    }


  bookings: Booking[];
  constructor(public userProfileService: UserProfileService, private hotelInfo: HotelInfo) { }

  ngOnInit() {
    //this.bookingsObs = this.getBookingsObs();
    this.userProfileService.getUserInfo();
  }

}
