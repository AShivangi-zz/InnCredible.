import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Reservation } from './reservation.model';
import {AngularFireAuth} from 'angularfire2/auth';

@Injectable()
export class ReservationService {
  reservations: AngularFireList<any>;
  userID: string;
  activeReservation: Reservation = new Reservation();

  private hotelID: string;
  constructor(private db: AngularFireDatabase, private afa: AngularFireAuth) {
    this.afa.authState.subscribe(auth => {
      if (auth) { this.userID = auth.uid;
                  this.activeReservation.guests = 1;
                  this.activeReservation.beds = 1;
                  this.activeReservation.comments = ''; }
    });
  }

  insertReservation(newReservation: Reservation) {
    if (!this.userID) { alert('User is not logged in!'); return;  }
    this.reservations = this.db.list(`users/${this.userID}/reservations`);
    this.reservations.push(newReservation);
  }

  setHotelID(id:string) {
    this.hotelID = id;
  }
 /* updateReservation(r: Reservation) {
    this.reservationList.update(r.$key,
      {
        // uid: r.uid,
        guests: r.guests,
        beds: r.beds,
        comments: r.comments
      });
  }

  deleteReservation($key: string) {
    this.reservationList.remove($key);
  }*/
}
