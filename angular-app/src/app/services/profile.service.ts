import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuth } from "angularfire2/auth";

@Injectable()

export class UserProfileService {

    private authInfo;
    private firstname: string;
    private lastname : string;
    private rewardpoints: number;
    public email: string;
    public phototURL: string;
    private uid: string;
    private streetAddress: string;
    private city: string;
    private state: string;
    private country: string;
    private zipcode: string;

    isRedeem: boolean;
    buttonDisabled: boolean = false;

    constructor(public afAuth: AngularFireAuth) {
        //afAuth used in profile component to upload picture
    }

    async getUserInfo() {
        this.uid = firebase.auth().currentUser.uid;
        await firebase.database().ref('/users/' + this.uid).once('value')
            .then((snapshot) => {// ** My only change ** or use snapshot
                this.firstname = snapshot.child('firstname').val();
                this.lastname = snapshot.child('lastname').val();
                this.rewardpoints = snapshot.child('rewardPoints').val();
                console.log(this.rewardpoints);
                this.email = snapshot.child('email').val();
                this.phototURL = snapshot.child('photoURL').val();
                this.streetAddress = snapshot.child('streetAddress').val();
                this.city = snapshot.child('city').val();
                this.state = snapshot.child('state').val();
                this.country = snapshot.child('country').val();
                this.zipcode = snapshot.child('zipcode').val();
                return;
        });
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
        return this.phototURL;
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

    updateName(fName: string, lName: string) {
        if(fName.length > 0 && lName.length > 0) {
            const ref = firebase.database().ref();
            const user = {};
            this.firstname = fName;
            this.lastname = lName;
            user['/users/' + this.uid + '/firstname'] = fName;
            user['/users/' + this.uid + '/lastname'] = lName;
            ref.update(user);
        }


    }

    changeEmail(Email: string) {
        if(Email.length > 0 ) {
            const ref = firebase.database().ref();
            const user = {};
            this.email = Email;
            user['/users/' + this.uid + '/email'] = this.email;
            ref.update(user);

            firebase.auth().currentUser.updateEmail(Email)
            .then(function() {
                console.log('Email changed');
            });
        }
    }

    changePassword(password: string, re_pass: string) {
        if(password.length > 0 && re_pass.length > 0 && password === re_pass) {
            firebase.auth().currentUser.updatePassword(password)
            .then(function() {
                console.log("Password changed");
            });
        }
        else {
            console.log("Passwords don't match");
        }
    } 

}
