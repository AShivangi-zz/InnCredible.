import { Component, OnInit } from '@angular/core';
import {ReservationService} from "../shared/reservation.service";
import {Reservation} from "../shared/reservation.model";

@Component({
  selector: 'app-rewards',
  templateUrl: './rewards.component.html',
  styleUrls: ['./rewards.component.scss']
})
export class RewardsComponent implements OnInit {
  private reservation: Reservation;

  constructor(private reservationService: ReservationService) {
    this.reservationService.activeReservation.subscribe(value => this.reservation = value);
  }

  ngOnInit() {
  }

}
