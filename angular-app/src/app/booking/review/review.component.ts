import { Component, OnInit } from '@angular/core';
import { HotelInfo } from '../../services/hotel-info';
import { Hotel } from '../../models/hotel';
import {UserProfileService} from '../../services/profile.service';
import { Subscription } from 'rxjs/Subscription';
import {ReservationService} from '../shared/reservation.service';
import { Reservation } from '../shared/reservation.model';

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

  constructor(private hotel: HotelInfo, private reservationService: ReservationService, private userProfileService: UserProfileService) {
    this.hotel.activeHotel.subscribe(value => this.hotelData = value);
    this.reservationService.activeReservation.subscribe(value => this.reservation = value);
    this.taxRate = 8.25;
  }

  ngOnInit() {
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
}
