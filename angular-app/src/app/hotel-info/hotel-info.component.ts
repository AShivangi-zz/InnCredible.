import { Component, OnInit } from '@angular/core';
import { HotelInfo } from "../services/hotel-info";
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase';

@Component({
  selector: 'app-hotel-info',
  templateUrl: './hotel-info.component.html',
  styleUrls: ['./hotel-info.component.scss']
})

export class HotelInfoComponent implements OnInit {

  public imagesURL: URL[] = [];
  public imgDone: boolean = false;

  constructor(private hotelInfo: HotelInfo) {
    // this.hotelInfo.setHotelId('0');
    this.hotelInfo.getHotelData('4');
   
    const images_ref =  firebase.database().ref('/hotels/4/images/');
    var count = 0;
    images_ref.once('value')
      .then((snapshot) => {
        const countImage = snapshot.numChildren();
        for(var i = 0; i < countImage; i++) {
          var number = i.toString();
          this.setImagesURL(snapshot.child(number).val());
          if(i == countImage -1) {
            this.setImgDone();
          }
        }
      });
    
  }

  ngOnInit() {

  }

  public setImagesURL(image){
    this.imagesURL.push(image);
  }

  public setImgDone(){
    this.imgDone = true;
  }

  }
