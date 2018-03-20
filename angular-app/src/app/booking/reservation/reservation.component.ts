import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormControl, FormBuilder } from '@angular/forms';
import { ReservationService } from '../shared/reservation.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  providers: [ReservationService]
})

export class ReservationComponent implements OnInit {
  guestOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  resvForm: FormGroup;


  constructor(private reservationService: ReservationService, private fb: FormBuilder) { }

  ngOnInit() {
    this.resvForm = this.createGuestForm();
    const guests = this.resvForm.get('guests');
    const rooms = this.resvForm.get('rooms');
    guests.valueChanges.subscribe(val => {
      rooms.setValue(Math.ceil(val / 2));
    });
  }

  onSubmit(reservationForm: NgForm) {
    this.reservationService.insertReservation(reservationForm.value);
  }

  createGuestForm() {
      return this.fb.group({
        guests: 1,
        rooms:  0
      });
  }
}
