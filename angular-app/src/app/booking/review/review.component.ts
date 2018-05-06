import { Component, OnInit } from '@angular/core';
import { HotelInfo } from '../../services/hotel-info';
import { Hotel } from '../../models/hotel';
import { UserProfileService } from '../../services/profile.service';
import { Subscription } from 'rxjs/Subscription';
import { ReservationService } from '../shared/reservation.service';
import { Reservation } from '../shared/reservation.model';
import {SenditineraryinformationService} from "../../services/senditineraryinformation.service";
import {ActivatedRoute} from '@angular/router';
import * as firebase from 'firebase';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  public taxRate: number;
  public hotelData: Hotel;
  public reservation: Reservation;
  private subscription: Subscription;

  submit:boolean =false;

  constructor(private hotel: HotelInfo
              , private reservationService: ReservationService
              , public userProfileService: UserProfileService,
              private service: SenditineraryinformationService) {
    this.subscription = this.hotel.activeHotel.subscribe(value => this.hotelData = value);
    this.reservationService.activeReservation.subscribe(value => this.reservation = value);
    this.taxRate = 8.25;
    this.service = service;
  }

  ngOnInit() {}

  applyRewardAmnt(): number {
    if (!this.userProfileService.isRedeem) {
      return 0;
    }
    return this.userProfileService.rewardpoints / 25;
  }

  roomCharge(): number {
    if(this.reservation === null || this.reservation.nights === null || this.hotelData === null || this.hotelData.price === null) {
      return -1;
    }
    return (parseFloat(this.hotelData.price) * this.reservation.nights * this.reservation.rooms);
  }

  taxCharge(): number {
    return this.roomCharge() * (this.taxRate / 100);
  }

  orderTotal(): number {
    return this.roomCharge() + this.taxCharge() - this.applyRewardAmnt();
  }

  onClick() {
    const updateRes = this.reservation;
    updateRes.totalCost = this.orderTotal()
    // this.reservation.totalCost = this.orderTotal();
    this.reservationService.changeReservation(updateRes);
    if (this.userProfileService.isRedeem) {
      this.userProfileService.deductReward();
    }
    this.userProfileService.awardRewardPoints(this.roomCharge());
    this.service.saveInformation(this.hotelData.name, this.hotelData.location, this.reservation.guests,
      this.reservation.rooms, this.reservation.checkInDt, this.reservation.checkOutDt,
      this.roomCharge(), this.applyRewardAmnt(),this.taxCharge(),this.reservation.totalCost, firebase.auth().currentUser.email);
  }

  // getCheckIn() {
  //   if(this.reservation == null) {
  //     return null;
  //   } else if(this.reservation.checkInDt == null || this.reservation.checkInDt == undefined || !(this.reservation.checkInDt instanceof Date)) {
  //     //console.log('Instance 2 '+ (this.reservation.checkInDt instanceof Date));
  //     return null;
  //   }
  //   else {
  //     console.log('Instance '+ (this.reservation.checkInDt instanceof Date));
  //     console.log(this.reservation.checkInDt);
  //     console.log(this.reservation.checkInDt.toLocaleDateString());
  //     return this.reservation.checkInDt.toLocaleDateString();
  //     //this.reservation.checkInDt.toLocaleDateString();
  //   }
  // }
  //
  // isDateCI() {
  //   if(this.reservation == null) {
  //     return false;
  //   }
  //   if(this.reservation.checkInDt == null || this.reservation.checkInDt == undefined) {
  //     return false;
  //   }
  //   // alert('Check in: ' + this.reservation.checkInDt);
  //   return (this.reservation.checkInDt instanceof Date);
  // }
  //
  // isDateCO() {
  //   if(this.reservation === null) {
  //     return false;
  //   }
  //   if(this.reservation.checkOutDt === null || this.reservation.checkOutDt === undefined) {
  //     return false;
  //   }
  //   // alert('CheckOut: ' + this.reservation.checkOutDt);
  //   return (this.reservation.checkOutDt instanceof Date);
  // }

}
