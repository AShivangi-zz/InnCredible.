import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReservationService } from '../shared/reservation.service';
import {HotelInfo} from '../../services/hotel-info';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss'],
  providers: [ReservationService]
})

export class ReservationComponent implements OnInit {
  guestOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  resvForm: FormGroup;

  submit: boolean = false;

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
        rooms:  0,
        checkInDt: null,
        checkOutDt: null,
        comments: '',
        tAndC: [null, Validators.required]
      });
  }

  isFieldValid(field: string) {
    // return this.resvForm.get(field).value === '1';
    return !this.resvForm.get(field).valid && this.resvForm.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': !this.isFieldValid(field),
      'has-feedback': !this.isFieldValid(field)
    };
  }
}
