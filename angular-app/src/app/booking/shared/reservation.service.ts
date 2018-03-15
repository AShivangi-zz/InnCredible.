import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Reservation } from './reservation.model';
import {AngularFireAuth} from 'angularfire2/auth';


@Injectable()
export class ReservationService {
  reservations: AngularFireList<any>;
  userID: string;
  activeReservation: Reservation = new Reservation();

  constructor(private db: AngularFireDatabase, private afa: AngularFireAuth) {
    this.afa.authState.subscribe(auth => {
      if (auth) { this.userID = auth.uid; }
    });
  }

  getReservations() {
    if (!this.userID) { alert('Failed'); return;  }
    this.reservations = this.db.list(`users/${this.userID}/reservations`);
  }

  insertReservation(newReservation: Reservation) {
    // alert(this.userID);
    // alert('Guests:' + newReservation.guests);
    // alert('Beds:' + newReservation.beds);
    // alert('Comments:' + newReservation.comments);
    this.getReservations();
    this.reservations.push(newReservation);
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
