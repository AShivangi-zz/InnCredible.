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
  submit: boolean = false;

  constructor(private hotel: HotelInfo, 
    private reservationService: ReservationService, 
    private userProfileService: UserProfileService,
    private route:ActivatedRoute,
    public profile: UserProfileService) {
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
    if(!this.profile.isRedeem) {
      return 0;
    }
    var x = this.userProfileService.getRewardPoints()/25;
    return x;
  }

  roomCharge(): number {
    return (parseFloat(this.hotelData.price) * this.nights() * this.reservation.rooms);
  }

  taxCharge(): number {
    return this.roomCharge() * (this.taxRate / 100);
  }

  orderTotal(): number {
    return this.roomCharge() + this.taxCharge() - this.applyRewardAmnt();
  }

  onSubmit() {
    this.reservation.totalCost = this.orderTotal();
    this.reservationService.changeReservation(this.reservation);
    this.profile.awardRewardPoints(this.roomCharge());
    this.submit = true;
  }

  nights(): number {
    if (   this.reservation.checkInDt   === null
        || this.reservation.checkOutDt  === null
    ) {
      return null;
    }
      // Get 1 day in milliseconds
      const one_day = 1000 * 60 * 60 * 24;

      // Convert both dates to milliseconds
      const date1_ms = new Date(this.reservation.checkInDt).getTime();
      const date2_ms = new Date(this.reservation.checkOutDt).getTime();

      // Calculate the difference in milliseconds
      const difference_ms = date2_ms - date1_ms;

      // Convert back to days and return
      return Math.round(difference_ms / one_day);
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
