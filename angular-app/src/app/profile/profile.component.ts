import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../services/profile.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  constructor(public userProfileService: UserProfileService) { }

  ngOnInit() {
   this.getUserData();
  }

  async getUserData() {
    await this.userProfileService.getUserInfo();

    await this.userProfileService.pullReservations();

    await this.userProfileService.pullFavHotels();
  }

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