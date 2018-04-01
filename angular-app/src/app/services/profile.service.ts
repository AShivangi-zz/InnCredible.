import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { Reservation } from '../booking/shared/reservation.model';
import { promise } from 'protractor';

@Injectable()

export class UserProfileService {


    public authInfo;
    public firstname: string;
    public lastname : string;
    public rewardpoints: number;
    public email: string;
    public phototUrl: any;
    public uid: string;
    public streetAddress: string;
    public city: string;
    public state: string;
    public country: string;
    public zipcode: string;

    public reservation: Reservation[] = [];
    //private res: Reservation;
    isRedeem: boolean;
    buttonDisabled: boolean = false;


    constructor() {
        this.uid = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + this.uid).once('value')
            .then((snapshot) => {// ** My only change ** or use snapshot
                this.firstname = snapshot.child('firstname').val();
                this.lastname = snapshot.child('lastname').val();
                this.rewardpoints = snapshot.child('rewardPoints').val();
                //console.log(this.rewardpoints);
                this.email = snapshot.child('email').val();
                this.phototUrl = snapshot.child('photoURL').val();
                this.streetAddress = snapshot.child('streetAddress').val();
                this.city = snapshot.child('city').val();
                this.state = snapshot.child('state').val();
                this.country = snapshot.child('country').val();
                this.zipcode = snapshot.child('zipcode').val();  
        });
        
    }
    public getReservations(){
        var promise = firebase.database().ref('/users/'+  this.uid+'/reservations/').once('value')
                    .then((snapshot) => {
                        const countRes = snapshot.numChildren();
                        //console.log(countRes);
                        for(var i = 0; i < countRes; i++){
                            var number = i.toString();
                            let res = new Reservation();
                            var snap = Object.keys(snapshot.val());
                            var key = snap[i];
                            res.checkInDt = snapshot.child(key+'/checkInDt').val();
                            res.checkOutDt = snapshot.child(key+'/checkOutDt').val();
                            res.comments = snapshot.child(key+'/comments').val();
                            res.guests = snapshot.child(key+'/guests').val();
                            res.hotelID = snapshot.child(key+'/hotelID').val();
                            res.rooms = snapshot.child(key+'/rooms').val();
                            this.reservation.push(res);
                        }
                    });  
        return promise;
       // return this.reservation;
    }

    public getFirstName() {
        return this.firstname;
    }

    public getLastName() {
        return this.lastname;
    }

    public getFullName() {
        return this.firstname + ' ' + this.lastname;
    }

    public getRewardPoints() {
        return this.rewardpoints;
    }

    public getUserEmail() {
        return this.email;
    }

    public getPhotoURL() {
        return this.phototUrl;
    }
    public getStreetAddress() {
      return this.streetAddress;
    }
    public getCity() {
      return this.city;
    }
    public getState() {
      return this.state;
    }
    public getCountry() {
      return this.country;
    }
    public getZipcode() {
      return this.zipcode;
    }

    public reduceTotalBy(){
        return this.rewardpoints/25;
    }

    public awardRewardPoints(total: number){
        const ref = firebase.database().ref();
        const reward = {};
        reward['/users/' + this.uid + '/rewardPoints'] = Math.floor(this.getRewardPoints() + total / 10);
        ref.update(reward);
        return reward;
    }


    public deductReward() {
      const ref = firebase.database().ref();
      const reward = {};
      reward['/users/' + this.uid + '/rewardPoints'] = 0;
      ref.update(reward);
      return reward;
    }

}
