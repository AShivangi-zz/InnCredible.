import { Component, OnInit } from '@angular/core';
import { HotelInfo } from '../../services/hotel-info';
import { Hotel } from '../../models/hotel';
import {UserProfileService} from '../../services/profile.service';
import { Subscription } from 'rxjs/Subscription';
import {ReservationService} from '../shared/reservation.service';
import { Reservation } from '../shared/reservation.model';
import {ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  private taxRate: number;
  private hotelData: Hotel;
  private reservation: Reservation;
  // private subscription: Subscription;

  sub: any;
  hotelID: string;
  dataLoaded:boolean = false;

  constructor(private hotel: HotelInfo, 
    private reservationService: ReservationService, 
    private userProfileService: UserProfileService,
    private route:ActivatedRoute) {
    this.sub = this.route.params.subscribe(params => {
      this.hotelID = params['id'];
    });
    this.getData(this.hotelID);
    this.taxRate = 8.25;
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.hotelID = params['id'];
    });
    this.getData(this.hotelID);
  }

  applyRewardAmnt(): number {
    /* TODO if the user selects Skip or redeem*/
    //if(redeem is clicked)
    var x = this.userProfileService.getRewardPoints()/25;
    return x;
    /* TODO set reward points to 0 if the user redeems*/
    //else if skip is clicked
    //return 0;
  }

  roomCharge(): number {
    return (parseFloat(this.hotelData.price) * this.reservation.nights() * this.reservation.rooms);
  }

  taxCharge(): number {
    return this.roomCharge() * (this.taxRate / 100);
  }

  orderTotal(): number {
    return this.roomCharge() + this.taxCharge() - this.applyRewardAmnt();
  }

  onClick() {
    this.reservation.totalCost = this.orderTotal();
    this.reservationService.changeReservation(this.reservation);
  }

  private async getData(id: string) {
    this.hotelData = new Hotel();
    const id_ref =  firebase.database().ref('/hotel_id');
    var promise2;
    const promise = id_ref.once('value').then((snapshot) => {
    const count = snapshot.numChildren();
      for(var i = 0; i < count; i++) {
        const number = i.toString();
          if(snapshot.child(number).val() == id) {
          promise2 = this.hotel.getHotelData(number)
          return;
        }
      }
    });
    let value = await promise;
    let value2 = await promise2;

    this.hotelData = this.hotel.getHotel();
    this.reservationService.setHotelID(this.hotelData.hotelID);
    this.reservationService.activeReservation.subscribe(value => this.reservation = value);
    this.dataLoaded = true;
  }
}
