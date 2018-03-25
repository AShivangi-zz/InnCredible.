import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ReservationService} from './shared/reservation.service'
import * as firebase from 'firebase';
import { Http, Headers, URLSearchParams} from '@angular/http';
import {HotelInfo} from "../services/hotel-info";

// import { UserProfileService } from '../services/profile.service';
declare function createCharge(token);
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  providers: [HotelInfo]
})
export class BookingComponent implements OnInit {

  sub: any;

  private hotelID: string;

  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;

  message: string;

  getToken() {
    this.message = 'Loading...';

    (<any>window).Stripe.card.createToken({
      number: this.cardNumber,
      exp_month: this.expiryMonth,
      exp_year: this.expiryYear,
      cvc: this.cvc
    }, (status: number, response: any) => {
      if (status === 200) {
        this.message = `Success! Card token ${response.card.id}.`;
        let data = new URLSearchParams();
        data.append('card', response.id)
        data.append('currency', 'usd')
        data.append('amount', '1000')
        this.createCharge(data);
      } else {
        this.message = response.error.message;
      }
    });
  }

  createCharge(data) {
    const headers = new Headers({
      'Authorization': 'Bearer sk_test_S62sR6QYYNM9biuvTdPZOH7V',
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    this.http.post('https://api.stripe.com/v1/charges', data, {headers: headers})
      .subscribe(resp => {console.log(resp);})
  }

  constructor(
      private http: Http,
      private reservation: ReservationService,
      private route: ActivatedRoute,
      private hotel: HotelInfo) {
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
