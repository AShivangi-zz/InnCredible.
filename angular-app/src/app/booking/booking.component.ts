import { Charge } from './charge';
import { Component, OnInit } from '@angular/core';
import { Http, Headers, URLSearchParams} from '@angular/http';

// import { UserProfileService } from '../services/profile.service';
declare function createCharge(token);
@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
})
export class BookingComponent implements OnInit {

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

  
  constructor(private http: Http) { }
  // constructor(private userProfileService: UserProfileService) {
  // }


  ngOnInit() {
  }


}
