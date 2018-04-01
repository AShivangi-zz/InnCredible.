import { Component, OnInit } from '@angular/core';
import { Http, Headers, URLSearchParams } from '@angular/http'
import {Reservation} from "../shared/reservation.model";
import {ReservationService} from "../shared/reservation.service";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  private reservation: Reservation;
  cardNumber: string;
  expiryMonth: string;
  expiryYear: string;
  cvc: string;

  message: string;

  constructor(private http: Http,private reservationService: ReservationService) {
    this.reservationService.activeReservation.subscribe(value => this.reservation = value);
  }

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
        data.append('card', response.id);
        data.append('currency', 'usd');
        data.append('amount', Math.ceil(this.reservation.totalCost*100)+'');
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
    this.http.post('https://api.stripe.com/v1/charges', data, { headers: headers })
      .subscribe(resp => { console.log(resp); })
  }

  ngOnInit() {
  }

}
