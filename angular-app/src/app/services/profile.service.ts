import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from "angularfire2/auth";
import { Reservation } from '../booking/shared/reservation.model';

import { promise } from 'protractor';

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

    reservation: Reservation[] = [];
    //private res: Reservation;
    isRedeem: boolean;
    buttonDisabled: boolean = false;
    hasPicture: boolean;
    picIndex: number;

    constructor(afAuth: AngularFireAuth ) {
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

    getReservations() {
        var promise = firebase.database().ref('/users/' + this.uid + '/reservations/').once('value')
            .then((snapshot) => {
                const countRes = snapshot.numChildren();
                //console.log(countRes);
                for (var i = 0; i < countRes; i++) {
                    var number = i.toString();
                    let res = new Reservation();
                    var snap = Object.keys(snapshot.val());
                    var key = snap[i];
                    res.checkInDt = snapshot.child(key + '/checkInDt').val();
                    res.checkOutDt = snapshot.child(key + '/checkOutDt').val();
                    res.comments = snapshot.child(key + '/comments').val();
                    res.guests = snapshot.child(key + '/guests').val();
                    res.hotelID = snapshot.child(key + '/hotelID').val();
                    res.rooms = snapshot.child(key + '/rooms').val();
                    this.reservation.push(res);
                }
            });
        return promise;
        // return this.reservation;
    }

    public removeReservation(key) {
        var db = firebase.database();
     const removeReservation = db.ref('/users/'+  this.uid+ '/reservations/' +this.uid).child(key).remove(key);
     return;
        }

    getFirstName() {
        return this.firstname;
    }

    getLastName() {
        return this.lastname;
    }

    getFullName() {
        return this.firstname + ' ' + this.lastname;
    }

    getRewardPoints() {
        return this.rewardpoints;
    }

    getUserEmail() {
        return this.email;
    }

    getPhotoURL() {
        return this.phototURL;
    }
    getStreetAddress() {
        return this.streetAddress;
    }
    getCity() {
        return this.city;
    }
    getState() {
        return this.state;
    }
    getCountry() {
        return this.country;
    }
    getZipcode() {
        return this.zipcode;
    }

    reduceTotalBy() {
        return this.rewardpoints / 25;
    }

    awardRewardPoints(total: number) {
        const ref = firebase.database().ref();
        const reward = {};
        reward['/users/' + this.uid + '/rewardPoints'] = Math.floor(this.getRewardPoints() + total / 10);
        ref.update(reward);
        return reward;
    }


    deductReward() {
        const ref = firebase.database().ref();
        const reward = {};
        reward['/users/' + this.uid + '/rewardPoints'] = 0;
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
        console.log(index);
        user['/users/' + this.uid + '/pictureIndex'] = this.picIndex;
        ref.update(user);

    }

}
