import { Component, OnInit } from '@angular/core';
import { HotelInfo } from '../../services/hotel-info';
import { Hotel } from '../../hotel';
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

  constructor(private hotel: HotelInfo, private reservationService: ReservationService) {
    this.hotel.activeHotel.subscribe(value => this.hotelData = value);
    this.reservationService.activeReservation.subscribe(value => this.reservation = value);
    this.taxRate = 8.25;
  }

  ngOnInit() {
    // alert(this.hotelData.getHotelID() + '\n' + this.reservationService.getHotelID());
  }

  applyRewardAmnt(): number {
    /* TODO: Implement rewards */
    return 0;
  }

  roomCharge(): number {
    return (parseFloat(this.hotelData.getPrice()) * this.reservation.nights() * this.reservation.rooms);
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
