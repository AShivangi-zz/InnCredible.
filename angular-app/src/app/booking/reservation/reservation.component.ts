import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReservationService } from '../shared/reservation.service';
import {HotelInfo} from '../../services/hotel-info';
import {Reservation} from "../shared/reservation.model";
import {until} from "selenium-webdriver";
import elementIsDisabled = until.elementIsDisabled;
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.scss']
})

export class ReservationComponent implements OnInit {
  guestOptions = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  resvForm: FormGroup;
  reservation: Reservation;
  submit: boolean = false;

  sub: any;
  hotelID: string;

  constructor(private reservationService: ReservationService, 
    private fb: FormBuilder, 
    private route:ActivatedRoute) {
      this.sub = this.route.params.subscribe(params => {
        this.hotelID = params['id'];
      });
      this.reservationService.setHotelID(this.hotelID);
      this.reservationService.activeReservation.subscribe((value) => this.reservation = value);
  }

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
        rooms:  1,
        checkInDt: null,
        checkOutDt: null,
        comments: '',
        tAndC: [null, Validators.required],
        hotelID: this.hotelID
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
