import { Component, OnInit, ViewChild } from '@angular/core';
import { HotelInfo } from '../services/hotel-info';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from '../models/hotel';
import { } from '@types/googlemaps';
import {Subscription} from "rxjs/Subscription";

@Component({
  selector: 'app-hotel-info',
  templateUrl: './hotel-info.component.html',
  styleUrls: ['./hotel-info.component.scss']
})

export class HotelInfoComponent implements OnInit {

  @ViewChild('gmap') gmapElement: any;
  //map: google.maps.Map;
  public imagesURL: URL[] = [];
  public imgDone: boolean = false;

  private hotelID: string;
  returnedcheckindate: string;
  returnedcheckoutdate: string;

  private id: string;
  public sub: Subscription;
  public hotel: Hotel;

  public miami: boolean;
  public sf: boolean;
  public ny:boolean;
  public boston:boolean;
  public la: boolean;

  constructor(private hotelInfo: HotelInfo, private route: ActivatedRoute) {
    this.hotelInfo.activeHotel.subscribe(value => this.hotel = value);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.hotelID = params['id'];
      this.returnedcheckindate = params['id2'];
      this.returnedcheckoutdate = params['id3'];
    });

    this.getData();
  }

  async getLocation(address: string) {
    const geocoder = new google.maps.Geocoder();
    let latitude: number;
    let longitude: number;
    const gElement = this.gmapElement;
    let map: google.maps.Map;

    geocoder.geocode({'address': address}, await function (results, status) {

      if (status == google.maps.GeocoderStatus.OK) {
        latitude = results[0].geometry.location.lat();
        longitude = results[0].geometry.location.lng();

        var mapProp = {
          center: new google.maps.LatLng(latitude, longitude),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(gElement.nativeElement, mapProp);
        var marker;
        var markerOptions = {
          position: new google.maps.LatLng(latitude, longitude),
          map: map,
          title: address,
          icon: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png'
        };
        marker = new google.maps.Marker(markerOptions);
      }
    });
  }

  setMarker(map, position, title) {

  }

  public  getHotelByID() {
    const id_ref = firebase.database().ref('/hotel_id');
    id_ref.once('value').then((snapshot) => {
      for (let h = 0; h < snapshot.numChildren(); h++) {
        if (snapshot.child(h).val() === this.hotelID) {
          this.hotelInfo.getHotelData(h.toString());
          const images_ref = firebase.database().ref('/hotels/' + h + '/images/');

          images_ref.once('value').then((snapshot_img) => {
            const countImg = snapshot_img.numChildren();
            for (let i = 0; i < countImg; i++) {
              this.setImagesURL(snapshot_img.child(i).val());
              if (i === countImg - 1) {
                this.setImgDone();
              }
            }
          });
          break;
        }
      }
    });
  }

  public async getData() {
console.log(this.hotel);
    if (this.hotel === null) {
      await this.getHotelByID();
      await this.getLocation(this.hotel.location);
      await this.getcity(this.hotel.location);
    } else {
      await this.getLocation(this.hotel.location);
      await this.getcity(this.hotel.location);
    }
  }

  public setImagesURL(image) {
    this.imagesURL.push(image);
  }

  public setImgDone() {
    this.imgDone = true;
  }

  async getcity(address: string){
    if(this.hotel.city=="Miami"){
      this.miami=true;
    }
    if(this.hotel.city=="San Francisco"){
      this.sf=true;
    }
    if(this.hotel.city=="New York"){
      this.ny=true;
    }
    if(this.hotel.city=="Boston"){
      this.boston=true;
    }
    if(this.hotel.city=="Los Angeles"){
      this.la=true;
    }

  }


}
