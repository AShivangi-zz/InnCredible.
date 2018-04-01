import { Component, OnInit } from '@angular/core';
import {UserProfileService} from '../services/profile.service';
import * as firebase from 'firebase';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  //Profile tab variables
  newName: boolean = false;
  newPassword: boolean = false;
  newEmail: boolean = false;
  changePic: boolean = false;


  constructor(public userProfileService: UserProfileService) {
  }

  ngOnInit() {
    this.userProfileService.getUserInfo();
  }

  async uploadPic(event: any) {
    const file: File = event.target.files[0];

    const metaData = {'contentType': file.type};
    const storageRef: firebase.storage.Reference =  await firebase.storage().ref('/photos/'+this.userProfileService.afAuth.auth.currentUser.uid);
    storageRef.put(file, metaData);

    const currentUser = this.userProfileService.afAuth.auth.currentUser;

    storageRef.getDownloadURL().then(function(url) {
      //Change image on front end
      var img: HTMLImageElement = <HTMLImageElement>document.getElementById('profile-img');
      img.src = url;

      //Change image url on the database
      var ref = firebase.database().ref();
      var user = {};
      user["/Users/"+currentUser.uid+"/profile/picture"] = url;

      currentUser.updateProfile({
        displayName: currentUser.displayName,
        photoURL: url
      });
      return;
    }).then(() => {this.changePic = false;});
  }

}
