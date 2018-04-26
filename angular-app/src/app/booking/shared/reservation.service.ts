import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList} from 'angularfire2/database';
import { Reservation } from './reservation.model';
import { AngularFireAuth } from 'angularfire2/auth';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class ReservationService {
  reservations: AngularFireList<any>;
  userID: string;

  private reservation = new Reservation();

  private _sourceReservation = new BehaviorSubject<Reservation>(null);

  public activeReservation = this._sourceReservation.asObservable();

  public changeReservation(r: Reservation) {
    this.reservation = r;
    this.calcNights();
    this._sourceReservation.next(this.reservation);
  }

  constructor(private db: AngularFireDatabase, private afa: AngularFireAuth) {
    this.afa.authState.subscribe(auth => {
      if (auth) { this.userID = auth.uid; }
                  // this.reservation.guests = 1;
                  // this.reservation.rooms = 1;
                  // this.reservation.comments = ''; }
    });
  }

  async insertReservation(r: Reservation) {
    if (!this.userID) { alert('User is not logged in!'); return;  }
    this.reservations = this.db.list('users/'+this.userID+'/reservations');
    var newRef = await this.reservations.push(r)
    .then((snap) => {
      this.reservation.$key = snap.key;
    });
    this.changeReservation(r);
  }

  public setHotelID(id: string) {
    this.reservation.hotelID = id;
    this._sourceReservation.next(this.reservation);
  }

  public getHotelID() {
    return this.reservation.hotelID;
  }

  /*
      Date Difference function retrieved from:
      https://www.htmlgoodies.com/html5/javascript/calculating-the-difference-between-two-dates-in-javascript.html
    */
  calcNights() {
    if (this.reservation.checkInDt === null || this.reservation.checkOutDt === null) {
      this.reservation.nights = null;
    } else {
      // Get 1 day in milliseconds
      const one_day = 1000 * 60 * 60 * 24;

      // Convert both dates to milliseconds
      const date1_ms = new Date(this.reservation.checkInDt).getTime();
      const date2_ms = new Date(this.reservation.checkOutDt).getTime();

      // Calculate the difference in milliseconds
      const difference_ms = date2_ms - date1_ms;

      // Convert back to days and return
      this.reservation.nights = Math.round(difference_ms / one_day);
    }
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
