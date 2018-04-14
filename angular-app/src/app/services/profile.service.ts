import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from "angularfire2/auth";
import { Reservation } from '../booking/shared/reservation.model';

import { promise } from 'protractor';
import { Hotel } from "../models/hotel";
import { HotelInfo } from './hotel-info';
import { Booking } from '../models/booking';

import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";


@Injectable()

export class UserProfileService {

    authInfo;
    firstname: string;
    lastname: string;
    rewardpoints: number;
    email: string;
    phototURL: string;
    uid: string;
    streetAddress: string;
    city: string;
    state: string;
    country: string;
    zipcode: string;

    bookings: Booking[] = [];
    private _observableList: BehaviorSubject<Booking[]> = new BehaviorSubject([])
    bookingsObs: Observable<Booking[]>;
  
    isRedeem: boolean;
    buttonDisabled: boolean = false;
    hasPicture: boolean;
    picIndex: number;

    constructor(public afAuth: AngularFireAuth, private hotelInfo: HotelInfo) {
        //afAuth used in profile component to upload picture
        this.getUserInfo();
    }

    async getUserInfo() {
        this.uid = firebase.auth().currentUser.uid;
        await firebase.database().ref('/users/' + this.uid).once('value')
            .then((snapshot) => {// ** My only change ** or use snapshot
                this.firstname = snapshot.child('firstname').val();
                this.lastname = snapshot.child('lastname').val();
                this.rewardpoints = snapshot.child('rewardPoints').val();
                //console.log(this.rewardpoints);
                this.email = snapshot.child('email').val();
                this.phototURL = snapshot.child('photoURL').val();
                this.streetAddress = snapshot.child('streetAddress').val();
                this.city = snapshot.child('city').val();
                this.state = snapshot.child('state').val();
                this.country = snapshot.child('country').val();
                this.zipcode = snapshot.child('zipcode').val();

                if (snapshot.child('pictureIndex').exists()) {
                    this.picIndex = snapshot.child('pictureIndex').val();
                    this.hasPicture = true;
                } else { this.hasPicture = false; }
                return;
            });
    }

    async pullReservations() {
        await firebase.database().ref('/users/' + this.uid + '/reservations/').once('value')
            .then((snapshot) => {
                const countRes = snapshot.numChildren();
                for (var i = 0; i < countRes; i++) {
                    var number = i.toString();
                    let booking = new Booking();
                    var snap = Object.keys(snapshot.val());
                    var key = snap[i];
                    booking.$key = key;
                    booking.checkInDt = snapshot.child(key + '/checkInDt').val();
                    booking.checkOutDt = snapshot.child(key + '/checkOutDt').val();
                    booking.comments = snapshot.child(key + '/comments').val();
                    booking.guests = snapshot.child(key + '/guests').val();
                    booking.rooms = snapshot.child(key + '/rooms').val();
                    this.getHotelInfo(snapshot.child(key + '/hotelID').val(), booking);
                    this.bookings.push(booking);
                    console.log(booking);
                }
            });
            this._observableList.next(this.bookings.reverse());
    }

    async getHotelInfo(hotelID: string, booking: Booking) {
        var hotel = new Hotel();
        const id_ref = firebase.database().ref('/hotel_id');
        var index;
        await id_ref.once('value').then((snapshot) => {
            const count = snapshot.numChildren();
            for (var i = 0; i < count; i++) {
                const number = i.toString();
                if (snapshot.child(number).val() == hotelID) {
                  index = number;
                  break;
                }
            }
        }); 
        await this.hotelInfo.getHotelData(index);
        hotel = this.hotelInfo.getHotel();
        booking.hotelName = hotel.name;
        booking.hotelLoc = hotel.location;
    }
  
    public async removeReservation(key) {

     await firebase.database().ref('/users/' + this.uid + '/reservations/').child(key).remove();
     window.location.reload();

    }

    getBookingsObs():Observable<Booking[]> {
        return this._observableList.asObservable();
    }

    getFullName() : string {
        return this.firstname + " " + this.lastname;
    }

    reduceTotalBy() {
        return this.rewardpoints / 25;
    }

    async awardRewardPoints(total: number) {
        const ref = firebase.database().ref();
        const reward = {};
        reward['/users/' + this.uid + '/rewardPoints'] = Math.floor(this.rewardpoints + total / 10);
        await ref.update(reward);
        return reward;
    }


    async deductReward() {
        const ref = firebase.database().ref();
        const reward = {};
        reward['/users/' + this.uid + '/rewardPoints'] = 0;
        this.rewardpoints = 0;
        await ref.update(reward);
        return reward;
    }

    updateName(fName: string, lName: string) {
        if (fName != null && lName != null && fName.length > 0 && lName.length > 0) {
            const ref = firebase.database().ref();
            const user = {};
            this.firstname = fName;
            this.lastname = lName;
            user['/users/' + this.uid + '/firstname'] = fName;
            user['/users/' + this.uid + '/lastname'] = lName;
            ref.update(user);
        }
    }

    setHasPic(bool: boolean) {
        this.hasPicture = bool;
    }

    changeEmail(Email: string) {
        if (Email != null && Email.length > 0) {
            const ref = firebase.database().ref();
            const user = {};
            this.email = Email;
            user['/users/' + this.uid + '/email'] = this.email;
            ref.update(user);

            firebase.auth().currentUser.updateEmail(Email)
                .then(function () {
                    console.log('Email changed');
                });
        }
    }

    changePassword(password: string, re_pass: string) {
        if (password != null && re_pass != null && password.length > 0 && re_pass.length > 0 && password === re_pass) {
            firebase.auth().currentUser.updatePassword(password)
                .then(function () {
                    console.log("Password changed");
                });
        }
        else {
            console.log("Passwords don't match");
        }
    }

    setPicIndex(index: number) {
        const ref = firebase.database().ref();
        const user = {};
        this.picIndex = index;
        this.hasPicture = true;
        console.log(index);
        user['/users/' + this.uid + '/pictureIndex'] = this.picIndex;
        ref.update(user);

    }


}
