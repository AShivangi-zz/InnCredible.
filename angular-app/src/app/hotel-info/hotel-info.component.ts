import { Component, OnInit } from '@angular/core';
import { HotelInfo } from '../services/hotel-info';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import {Hotel} from '../models/hotel';

@Component({
  selector: 'app-hotel-info',
  templateUrl: './hotel-info.component.html',
  styleUrls: ['./hotel-info.component.scss']
})

export class HotelInfoComponent implements OnInit {

  public imagesURL: URL[] = [];
  public imgDone: boolean = false;
  private hotelID: string;
  private id: string;
  public sub: any;
  public hotel = new Hotel();
  constructor(private hotelInfo: HotelInfo, private route: ActivatedRoute) {
    // this.hotelInfo.setHotelId('0');

  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.hotelID = params['id'];
    });

    const id_ref =  firebase.database().ref('/hotel_id');
    id_ref.once('value').then((snapshot) => {
      const count = snapshot.numChildren();
        for(var i = 0; i < count; i++) {
          const number = i.toString();
          if(snapshot.child(number).val() == this.hotelID) {
            this.getData(number);
            const images_ref =  firebase.database().ref('/hotels/'+ number + '/images/');
            images_ref.once('value')
            .then((snapshot_img) => {
              const countImage = snapshot_img.numChildren();
              for(var i = 0; i < countImage; i++) {
                var number = i.toString();
                this.setImagesURL(snapshot_img.child(number).val());
                if(i == countImage -1) {
                  this.setImgDone();
                }
               }
            });
            i = count;
          }
        }
    });
  }

  public async getData(number) {
    var promise = await this.hotelInfo.getHotelData(number);
    this.hotel = this.hotelInfo.getHotel();
  }

  public setImagesURL(image){
    this.imagesURL.push(image);
  }

  public setImgDone(){
    this.imgDone = true;
  }

  }
