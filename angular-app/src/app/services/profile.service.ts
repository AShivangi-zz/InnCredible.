import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from "angularfire2/auth";
import { Reservation } from '../booking/shared/reservation.model';

import { promise } from 'protractor';
import { Hotel } from "../models/hotel";
import { HotelInfo } from './hotel-info';
import { Booking } from '../models/booking';

import { DatePipe } from '@angular/common';
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { Observable } from "rxjs/Observable";
import { snapshotChanges } from 'angularfire2/database';


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
    history: Booking[] = [];
    private _observableList: BehaviorSubject<Booking[]> = new BehaviorSubject([])
    private _observableList2: BehaviorSubject<Booking[]> = new BehaviorSubject([])
    bookingsObs: Observable<Booking[]>;

    favorites: string[] = [];
    private _observableFavList: BehaviorSubject<Hotel[]> = new BehaviorSubject([]);
    favEmpty: boolean = false;
    favHotels: Hotel[] = [];
    isRedeem: boolean;
    buttonDisabled: boolean = false;
    hasPicture: boolean;
    picIndex: number;
    pipe : DatePipe;

    constructor(public afAuth: AngularFireAuth, private hotelInfo: HotelInfo) {
        //afAuth used in profile component to upload picture
        //this.getUserInfo();
        this.pipe = new DatePipe("en-US");

    }

    async getUserInfo() {
        this.uid = await firebase.auth().currentUser.uid;
        if (this.uid !== null) {
            await firebase.database().ref('/users/' + this.uid).on('value', (snapshot) => {// ** My only change ** or use snapshot
                    this.firstname = snapshot.child('firstname').val();
                    this.lastname = snapshot.child('lastname').val();
                    this.rewardpoints = snapshot.child('rewardPoints').val();
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
    }

    async pullReservations() {
        await firebase.database().ref('/users/' + this.uid + '/reservations/').once('value').then( 
            async(snapshot) => {
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
                    booking.hotelID = snapshot.child(key +'/hotelID').val();
                    await this.getHotelInfo(snapshot.child(key + '/hotelID').val(), booking);

                    var dat: string = this.pipe.transform(new Date, 'yyyy-MM-dd')
                    var today = Date.parse(dat);
                    var chIn = Date.parse(booking.checkInDt);
                    var chOut = Date.parse(booking.checkOutDt);

                    if(chIn > today)
                    {
                        this.bookings.push(booking);
                    }
                    else {
                        this.history.push(booking);
                    }
                }
            });
            this._observableList.next(this.bookings.reverse());
            this._observableList2.next(this.history.reverse());
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
        booking.image = hotel.firstImage;
    }

    public async removeReservation(key) {
        console.log(key);
        await firebase.database().ref('/users/' + this.uid + '/reservations/').child(key).remove();
        window.location.reload();

    }

    async editComment(key, new_comment) {
        console.log(key+' '+new_comment);
        const ref = firebase.database().ref();
        const comment = {};
        comment['/users/' + this.uid + '/reservations/' + key + '/comments/']= new_comment;
        await ref.update(comment);
        window.location.reload();
    }

    getBookingsObs(): Observable<Booking[]> {
        return this._observableList.asObservable();
    }
    
    getHistoryObs():Observable<Booking[]> {
        return this._observableList2.asObservable();
    }

    getFullName(): string {
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


    deductReward() {
        const ref = firebase.database().ref();
        const reward = {};
        reward['/users/' + this.uid + '/rewardPoints'] = 0;
        this.rewardpoints = 0;
        ref.update(reward);
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
        user['/users/' + this.uid + '/pictureIndex'] = this.picIndex;
        ref.update(user);

    }

    async addToFav(hotelID) {
        const ref = await firebase.database().ref('/users/' + this.uid).child('/favorites/').push(hotelID);
    }

    async removeFav(hotelID) {
        var key: string;
        const ref = firebase.database().ref('/users/' + this.uid + '/favorites/');
        await ref.once('value')
            .then(async (snapshot) => {
                const countRes = snapshot.numChildren();
                for (var i = 0; i < countRes; i++) {
                    var snap = Object.keys(snapshot.val());
                    key = snap[i];
                    if(snapshot.child(key).val() == hotelID) {
                        await ref.child(key).remove();
                        window.location.reload();
                    }
                }
            });

    }

    async pullFavHotels() {
        await firebase.database().ref('/users/' + this.uid + '/favorites/').on('value',
            async (snapshot) => {
                const countFav = snapshot.numChildren();
                for (var i = 0; i < countFav; i++) {
                    var snap = Object.keys(snapshot.val());
                    var key = snap[i];
                    var htlID = snapshot.child(key).val();

                    this.favorites.push(htlID);

                    await this.getFavHotelInfo(htlID);
                }

                this._observableFavList.next(this.favHotels);
            });
    }

    async getFavHotelInfo(htlID) {
        var hotel = new Hotel();
        const id_ref = firebase.database().ref('/hotel_id');
        var index;
        await id_ref.once('value').then((snapshot) => {
            const count = snapshot.numChildren();
            for (var i = 0; i < count; i++) {
                const number = i.toString();
                if (snapshot.child(number).val() == htlID) {
                    index = number;
                    break;
                }
            }
        });
        await this.hotelInfo.getHotelData(index);
        hotel = this.hotelInfo.getHotel();
        this.favHotels.push(this.hotelInfo.getHotel())
    }

    getFavesList() {
        return this.favorites;
    }

    getFavesObs(): Observable<Hotel[]> {
        return this._observableFavList.asObservable();
    }

}
