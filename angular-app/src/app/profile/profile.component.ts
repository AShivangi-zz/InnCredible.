import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../services/profile.service';
import * as firebase from 'firebase';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import { Reservation } from '../booking/shared/reservation.model';
import { Hotel } from "../models/hotel";
import { HotelInfo } from '../services/hotel-info';

import { Booking } from '../models/booking';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {


  reservations: Reservation[];
  
  bookings: Booking[] = [];
  done: boolean = false;

  private _observableList: BehaviorSubject<Booking[]> = new BehaviorSubject([])
  bookingsObs: Observable<Booking[]>;
  firstTime:boolean = true;


  constructor(public userProfileService: UserProfileService, private hotelInfo: HotelInfo) { }

  ngOnInit() {
    this.userProfileService.getUserInfo();

    this.userProfileService.pullReservations();
    //this.pullReservations();
  }
/*
  public async pullReservations() {
    await this.userProfileService.getReservations();
    this.reservations = this.userProfileService.reservation;
    let numRes = this.reservations.length;
    console.log("Num Res", numRes);
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
    this.done = true;
    this.bookings.reverse();
  }

  getBookingsObs(): Observable<Booking[]>{
    this.firstTime = false;
    return this._observableList.asObservable();
  }*/


  getAvatars(): string[] {
    var avatars: string[] = [];
    avatars.push('../assets/user_avatars/man_1.png');
    avatars.push('../assets/user_avatars/man_2.png');
    avatars.push('../assets/user_avatars/man_3.png');
    avatars.push('../assets/user_avatars/woman_1.png');
    avatars.push('../assets/user_avatars/woman_2.png');
    avatars.push('../assets/user_avatars/woman_3.png');

    return avatars;
  }

  /*
  async uploadPic(event: any) {
    const file: File = event.target.files[0];

    const metaData = {'contentType': file.type};
    const storageRef: firebase.storage.Reference =  await firebase.storage().ref('/photos/'+this.userProfileService.afAuth.auth.currentUser.uid);
    storageRef.put(file, metaData);

    const currentUser = this.userProfileService.afAuth.auth.currentUser;
    const service = this.userProfileService;

    storageRef.getDownloadURL().then(function(url) {

      service.setHasPic(true);

      //Change image url on the database
      var ref = firebase.database().ref();
      var user = {};
      user["/users/"+currentUser.uid+"/photoURL"] = url;

      //Change image on front end
      var img: HTMLImageElement = <HTMLImageElement>document.getElementById("upic");
      img.src = url;

      currentUser.updateProfile({
        displayName: currentUser.displayName,
        photoURL: url
      });
      return;
    }).then(() => {this.changePic = false;});
  }*/
}