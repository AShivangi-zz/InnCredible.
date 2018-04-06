import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { UserProfileService } from '../../services/profile.service';
import * as firebase from 'firebase';
import {
  startOfDay,
  endOfDay,
  subDays,
  addDays,
  endOfMonth,
  isSameDay,
  isSameMonth,
  addHours
} from 'date-fns';
import {
  CalendarEvent,
  CalendarEventTimesChangedEvent,
} from 'angular-calendar';
import { Subject } from 'rxjs/Subject';
import { Hotel } from "../../models/hotel";
import { HotelInfo } from '../../services/hotel-info';
import { Booking } from '../../models/booking';
import { Reservation } from '../../booking/shared/reservation.model';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./../../../../node_modules/angular-calendar/css/angular-calendar.css']
})
export class CalendarComponent implements OnInit {
  reservations: Reservation[];
  bookings: Booking[] = [];
  events: CalendarEvent[] = [];

  viewDate: Date = new Date();
  view = 'week';
  isDragging = false;
  refresh: Subject<any> = new Subject();

  constructor(public userProfileService: UserProfileService, private hotelInfo: HotelInfo) { }

  ngOnInit() {
    this.pullReservations();
    this.userProfileService.getUserInfo();
    this.createEvents();
  }

  eventTimesChanged({ event, newStart, newEnd }: CalendarEventTimesChangedEvent): void {
    if (this.isDragging) {
      return;
    }
    this.isDragging = true;

    event.start = newStart;
    event.end = newEnd;
    this.refresh.next();

    setTimeout(() => {
      this.isDragging = false;
    }, 1000);
  }

  hourSegmentClicked(event): void {
    let newEvent: CalendarEvent = {
      start: event.date,
      end: addHours(event.date, 1),
      title: 'TEST EVENT',
      cssClass: 'custom-event',
      color: {
        primary: '#488aff',
        secondary: '#bbd0f5'
      },
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    }

    this.events.push(newEvent);
    this.refresh.next();
  }

  public async pullReservations() {
    await this.userProfileService.getReservations();
    this.reservations = this.userProfileService.reservation;
    let numRes = this.reservations.length;

    for (let i = 0; i < numRes; i++) {
      var num = i.toString();
      var hotel = new Hotel();
      var booking = new Booking();

      const id_ref = firebase.database().ref('/hotel_id');
      var index;
      await id_ref.once('value').then((snapshot) => {
        const count = snapshot.numChildren();
        for (var i = 0; i < count; i++) {
          const number = i.toString();
          if (snapshot.child(number).val() == this.reservations[num].hotelID) {
            index = number;
            break;
          }
        }
      });
      await this.hotelInfo.getHotelData(index);
      hotel = this.hotelInfo.getHotel();
      booking.hotelName = hotel.name;
      booking.hotelLoc = hotel.location;
      booking.$key = this.reservations[num].$key;
      booking.checkInDt = this.reservations[num].checkInDt;
      booking.checkOutDt = this.reservations[num].checkOutDt;
      booking.comments = this.reservations[num].comments;
      booking.guests = this.reservations[num].guests;
      booking.rooms = this.reservations[num].rooms;
      this.bookings.push(booking);
    }
  }

  public async createEvents(){
    this.bookings.forEach(element => {
      let newEvent: CalendarEvent = {
        start: element.checkInDt,
        end: addHours(element.checkOutDt, 1),
        title: element.hotelName,
        cssClass: 'custom-event',
        color: {
          primary: '#488aff',
          secondary: '#bbd0f5'
        },
        resizable: {
          beforeStart: true,
          afterEnd: true
        },
        draggable: true
      }
      this.events.push(newEvent);
      this.refresh.next();
    });
    this.events.push({
      start: startOfDay(new Date()),
      end: startOfDay(new Date()),
      title: 'Test Event',
      cssClass: 'custom-event',
      color: {
        primary: '#488aff',
        secondary: '#bbd0f5'
      },
      resizable: {
        beforeStart: true,
        afterEnd: true
      },
      draggable: true
    });
  }
}
