import { Component, OnInit } from '@angular/core';
import { NgForm} from '@angular/forms';
import { ReservationService } from '../shared/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  providers: [ReservationService]
})

export class ReservationComponent implements OnInit {
  guestOptions = [1, 2, 3, 4, 5, 6, 7, 8];
  bedOptions = [1, 2, 3, 4];

  constructor(private reservationService: ReservationService) { }

  ngOnInit() {

  }

  onSubmit(reservationForm: NgForm) {
    this.reservationService.insertReservation(reservationForm.value);
  }
}
