import { Injectable } from '@angular/core';
import * as firebase from 'firebase';

@Injectable()

export class UserProfileService {

    private authInfo;
    private firstname: string;
    private lastname : string;
    private rewardpoints: string;
    private email: string;
    private phototUrl: any;
    private uid: string;

    constructor() {
        this.uid = firebase.auth().currentUser.uid;
        firebase.database().ref('/users/' + this.uid).once('value')
            .then((snapshot) => {// ** My only change ** or use snapshot
                this.firstname = snapshot.child('firstname').val();
                this.lastname = snapshot.child('lastname').val();
                this.rewardpoints = snapshot.child('rewardPoints').val();
                console.log(this.rewardpoints);
                this.email = snapshot.child('email').val();
                this.phototUrl = snapshot.child('photoURL').val();
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
        return this.phototUrl;
    }

}
