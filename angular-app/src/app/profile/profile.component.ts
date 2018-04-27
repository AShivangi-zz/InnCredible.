import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../services/profile.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss',
'./../../../node_modules/angular-calendar/css/angular-calendar.css']
})
export class ProfileComponent implements OnInit {

  constructor(public userProfileService: UserProfileService) { }

  ngOnInit() {
   this.getUserData();
  }

  async getUserData() {
    //await this.userProfileService.getUserInfo();

    await this.userProfileService.pullReservations();

    await this.userProfileService.pullFavHotels();
  }

  getBackgrounds(): string[] {
    var back: string[] = [];
    back.push('https://i.pinimg.com/originals/5b/8e/9e/5b8e9eb9d0863cb14d835e727fbb68d3.gif');
    back.push('https://fsmedia.imgix.net/b0/95/91/86/523c/46f5/ab7c/1d9fd313b640/blue-lights.gif');
    back.push('http://3.bp.blogspot.com/-BeqvYhce9yg/UrfUjJNUjuI/AAAAAAAANns/UFrGm36cZzw/s1600/Prague+at+Dusk%252C+Czech+Republic+-+1600x1200+-+ID+39476+-+PREMIUM_Historical+Buildings+Wallpaper_Pictures%2540wpshub.blogspot.com045-SNOW.gif');
    back.push('https://media3.giphy.com/media/3o7qDNfxtNRtLVv8qs/giphy.gif');
    back.push('https://lh3.googleusercontent.com/-kxR25y9hmbM/Wl9tbxbQw-I/AAAAAAAANoE/joqFK1zAc_oSuRU95V1VU1dRcIdcPY7hwCJoC/w700-h292/8%2BBit%2BImage%2B%25289%2529.gif');
    back.push('https://i.gifer.com/WuBj.gif');

    return back;
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