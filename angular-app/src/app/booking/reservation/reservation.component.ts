import { Component, OnInit, Input } from '@angular/core';
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
  returnedcheckindate: string;
  returnedcheckoutdate: string;

  constructor(private reservationService: ReservationService,
    private fb: FormBuilder,
    private route: ActivatedRoute) {
      this.reservationService.activeReservation.subscribe((value) => this.reservation = value);
  }

  ngOnInit() {
    
    var dtToday = new Date();
    document.getElementById('checkindate').setAttribute("min", dtToday.toISOString().split('T')[0]);

    this.sub = this.route.params.subscribe(params => {
      this.hotelID = params['id'];
      this.returnedcheckindate = params['id2'];
      this.returnedcheckoutdate = params['id3'];
    });
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
      return new FormGroup({
        guests: new FormControl({value: 1, disabled: false},Validators.required),
        rooms:  new FormControl({value: 1, disabled: false}),
        checkInDt: new FormControl({value: this.returnedcheckindate, disabled: false}),
        checkOutDt: new FormControl({value: this.returnedcheckoutdate, disabled: false}),
        comments: new FormControl({value: '', disabled: false}),
        tAndC: new FormControl({value: null, disabled: false},Validators.required),
        hotelID: new FormControl({value: this.hotelID, disabled: false})
      });
  }

  isFieldValid(field: string) {
    return !this.resvForm.get(field).valid && this.resvForm.get(field).touched;
  }

  displayFieldCss(field: string) {
    return {
      'has-error': !this.isFieldValid(field),
      'has-feedback': !this.isFieldValid(field)
    };
  }

  updateDate() {
    console.log('activated');
    var checkIn = (<HTMLInputElement>document.getElementById('checkindate'));
    var checkOut = (<HTMLInputElement>document.getElementById('checkoutdate'));
    
    checkOut.setAttribute("min", checkIn.value);
  }
}
