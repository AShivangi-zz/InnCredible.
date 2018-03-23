import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ReservationService} from './shared/reservation.service'
import * as firebase from 'firebase';
// import { UserProfileService } from '../services/profile.service'

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {

  sub: any;

  private hotelID: string;

  constructor(private reservation: ReservationService, private route: ActivatedRoute) {
    // this.hotelInfo.setHotelId('0');
    
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.hotelID = params['id'];
    });
  
    const id_ref =  firebase.database().ref('/hotel_id');
    id_ref.once('value').then((snapshot)=> {
      const count = snapshot.numChildren();
      for(var i = 0; i < count; i++) {
        var number = i.toString();
        if(snapshot.child(number).val() == this.hotelID) {
          this.reservation.setHotelID(number);
        }
      }
    });
  }


}
