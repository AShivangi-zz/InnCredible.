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
    this.route.params.subscribe(async (params) => {
        await this.hotelInfo.initHotelByID(params['id']);
        await this.getLocation(this.hotel.location);
        this.getcity();
    });
    this.hotelInfo.activeHotel.subscribe(value => this.hotel = value);
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.hotelID = params['id'];
      this.returnedcheckindate = params['id2'];
      this.returnedcheckoutdate = params['id3'];
    });
  }

  async getLocation(address: string) {
    const geocoder = new google.maps.Geocoder();
    let latitude: number;
    let longitude: number;
    const gElement = this.gmapElement;
    let map: google.maps.Map;

    geocoder.geocode({'address': address}, await function (results, status) {

      if (status === google.maps.GeocoderStatus.OK) {
        latitude = results[0].geometry.location.lat();
        longitude = results[0].geometry.location.lng();

        const mapProp = {
          center: new google.maps.LatLng(latitude, longitude),
          zoom: 15,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        map = new google.maps.Map(gElement.nativeElement, mapProp);
        let marker;
        const markerOptions = {
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

  public setHotelID(id) {
    this.hotelID = id;
  }
  public setImagesURL(image) {
    this.imagesURL.push(image);
  }

  public setImgDone() {
    this.imgDone = true;
  }

  private getcity(){
    if(this.hotel.city === 'Miami'){
      this.miami = true;
    }
    if(this.hotel.city === 'San Francisco'){
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
