import { Component, OnInit /*, OnDestroy */} from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ReservationService } from './shared/reservation.service';
import { Http, Headers, URLSearchParams} from '@angular/http';
import { HotelInfo } from '../services/hotel-info';
import { Hotel } from '../models/hotel';
import { Reservation } from './shared/reservation.model';
// import {Subscription} from "rxjs/Subscription";

declare function createCharge(token);
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  providers: [ReservationService]
})

export class BookingComponent implements OnInit /*, OnDestroy */ {

  sub: any;

  private hotelData: Hotel;
  private newResrv: Reservation;

  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;
  message: string;
  // resvSubscription: Subscription;

  constructor(
      private http: Http,
      private reservationService: ReservationService,
      private route: ActivatedRoute,
      private hotel: HotelInfo) {

    this.hotel.activeHotel.subscribe(value => this.hotelData = value);
    // this.resvSubscription =
    this.reservationService.activeReservation.subscribe(value => this.newResrv = value);
    this.reservationService.setHotelID(this.hotelData.getHotelID());
  }

  ngOnInit() {
    // alert(this.reservation.getHotelID());
  }

  // ngOnDestroy() {
  //   this.resvSubscription.unsubscribe();
  // }

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

}
