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
import { CalendarEvent, CalendarEventTimesChangedEvent,} from 'angular-calendar';
import { Subject } from 'rxjs/Subject';
import { Booking } from '../../models/booking';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./../../../../node_modules/angular-calendar/css/angular-calendar.css']
})
export class CalendarComponent implements OnInit {
  bookings = this.userProfileService.getBookingsObs();
  events: CalendarEvent[] = [];

  viewDate: Date = new Date();
  view = 'week';
  isDragging = false;
  refresh: Subject<any> = new Subject();
  activeDayIsOpen: boolean = true;

  constructor(public userProfileService: UserProfileService) { }

  ngOnInit() {
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

  public async createEvents(){
    this.bookings.subscribe(element => element.forEach(item=>{
      let newEvent: CalendarEvent = {
        start: startOfDay(item.checkInDt),
        end: endOfDay(item.checkOutDt),
        title: item.hotelName+'',
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
    }));
    this.events.push({
      start: startOfDay(new Date()),
      end: endOfDay(new Date()),
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

  dayClicked({ date, events }: { date: Date; events: CalendarEvent[] }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }

}
