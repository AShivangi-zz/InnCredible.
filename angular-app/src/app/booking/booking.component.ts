import { Component, OnInit /*, OnDestroy */} from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ReservationService } from './shared/reservation.service';
import { Http, Headers, URLSearchParams} from '@angular/http';
import { HotelInfo } from '../services/hotel-info';
import { Hotel } from '../models/hotel';
import { Reservation } from './shared/reservation.model';
import {Location} from '@angular/common';
import * as firebase from 'firebase'
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

  hotelID: string;
  dataLoaded:boolean;

  constructor(
      private http: Http,
      private reservationService: ReservationService,
      private route: ActivatedRoute,
      private hotelInfo: HotelInfo,
      private location: Location) {
    /*this.hotel.activeHotel.subscribe(value => this.hotelData = value);
    // this.resvSubscription =
    this.reservationService.activeReservation.subscribe(value => this.newResrv = value);
    if(this.hotelData === null) {
      this.location.back();
      this.reservationService.setHotelID(this.hotelData.hotelID);
    }*/
      this.route.params.subscribe(async params => {
        this.hotelID = params['id'];
        await this.hotelInfo.initHotelByID(params['id']);
      });
      this.hotelInfo.activeHotel.subscribe( value => this.hotelData = value);

      this.reservationService.setHotelID(this.hotelData.hotelID);
      this.reservationService.activeReservation.subscribe(value => this.newResrv = value);
      this.dataLoaded = true;
      // this.getData(this.hotelID);
  }

  ngOnInit() {
    /*this.sub = this.route.params.subscribe(params => {
      this.hotelID = params['id'];
    });
    this.getData(this.hotelID);*/
  }

  // private async getData(id: string) {
  //   this.hotelData = new Hotel();
  //   const id_ref =  firebase.database().ref('/hotel_id');
  //   var promise2;
  //   const promise = id_ref.once('value').then((snapshot) => {
  //   const count = snapshot.numChildren();
  //     for(var i = 0; i < count; i++) {
  //       const number = i.toString();
  //         if(snapshot.child(number).val() == id) {
  //         promise2 = this.hotel.getHotelData(number)
  //         return;
  //       }
  //     }
  //   });
  //   let value = await promise;
  //   let value2 = await promise2;
  //
  //   this.hotelData = this.hotel.getHotel();
  //   this.reservationService.setHotelID(this.hotelData.hotelID);
  //   this.reservationService.activeReservation.subscribe(value => this.newResrv = value);
  //   this.dataLoaded = true;
  // }

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
