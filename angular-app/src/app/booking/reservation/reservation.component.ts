import { Component, OnInit, Input } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ReservationService } from '../shared/reservation.service';
import { HotelInfo } from '../../services/hotel-info';
import { Reservation } from "../shared/reservation.model";
import { until } from "selenium-webdriver";
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
  error:string;
  hotelID: string;
  returnedcheckindate: string;
  returnedcheckoutdate: string;

  constructor(private reservationService: ReservationService,
    private fb: FormBuilder,
    private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.resvForm = this.createGuestForm();
    this.sub = this.route.params.subscribe(params => {
      this.hotelID = params['id'];
      this.returnedcheckindate = params['id2'];
      this.returnedcheckoutdate = params['id3'];
    });

    const guests = this.resvForm.get('guests');
    const rooms = this.resvForm.get('rooms');
    guests.valueChanges.subscribe(val => {
      rooms.setValue(Math.ceil(val / 2));
    });

    this.reservationService.activeReservation.subscribe((value) => {
      this.reservation = value
      if (this.reservation === null) {
        this.reservation = new Reservation();
      }
      this.reservation.hotelID = this.hotelID;
      this.reservation.guests = 1;
      this.reservation.rooms = 1;
      this.reservation.checkInDt = new Date(this.returnedcheckindate);
      this.reservation.checkOutDt = new Date(this.returnedcheckoutdate);
    });
  }

  onSubmit() {
    if (this.resvForm.get('tAndC').value) {
      this.error = null;
      this.reservation.guests = this.resvForm.get('guests').value;
      this.reservation.rooms = this.resvForm.get('rooms').value;
      this.reservation.checkInDt = this.resvForm.get('checkInDt').value;
      this.reservation.checkOutDt = this.resvForm.get('checkOutDt').value;

      this.reservation.comments = this.resvForm.get('comments').value;

      this.reservationService.insertReservation(this.reservation);

      this.submit = true;
    } else {
      this.error = "Please agree to the Terms and Conditions";
    }
  }

  createGuestForm() {
    return new FormGroup({
      guests: new FormControl({ value: 1, disabled: false }, Validators.required),
      rooms: new FormControl({ value: 1, disabled: false }),
      checkInDt: new FormControl({ value: '', disabled: false }),
      checkOutDt: new FormControl({ value: '', disabled: false }),
      comments: new FormControl({ value: '', disabled: false }),
      tAndC: new FormControl({ value: null, disabled: false }, Validators.required),
      hotelID: new FormControl({ value: this.hotelID, disabled: false })
    });
  }
  /*
    isFieldValid(field: string) {
      return !this.resvForm.get(field).valid && this.resvForm.get(field).touched;
    }
  
    displayFieldCss(field: string) {
      return {
        'has-error': !this.isFieldValid(field),
        'has-feedback': !this.isFieldValid(field)
      };
    }*/
}
