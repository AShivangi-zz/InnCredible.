import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Hotel} from "../models/hotel";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {HotelInfo} from "./hotel-info"
@Injectable()
export class SearchService {
  constructor(private hotelInfo: HotelInfo) {
  }

  _observableList: BehaviorSubject<Hotel[]> = new BehaviorSubject([]);
  //search_city: string;

  public async retriveData(cityname: string, checkin: string, checkout: string) {
    //const ref = firebase.database().ref("/hotels");
    console.log(cityname+" "+checkin+" "+checkout);
    var x: string;
    var hotelList: Hotel[] = [];
    for (var i = 0; i < 71; i++) {
      x = i.toString();
      var promise = await this.hotelInfo.getHotelData(x);
      var hotel: Hotel = new Hotel();
      hotel = this.hotelInfo.getHotel();
      console.log(hotel.getCity());
      if (cityname === hotel.getCity()) {
        hotelList.push(hotel);
        console.log(hotel);
        this._observableList.next(hotelList);
      }
    }
  }

  public getObservableList(): Observable<Hotel[]> {
    return this._observableList.asObservable(); 
  }

}

