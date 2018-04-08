import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Hotel} from "../models/hotel";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {HotelInfo} from "./hotel-info"
@Injectable()
export class SearchService {
  constructor(private hotelInfo: HotelInfo) {}
  hotels: Hotel[]=  [];

  _observableList: BehaviorSubject<Hotel[]> = new BehaviorSubject([]);
  
  public async retriveData(cityname: string, checkin_new: string, checkout_new: string) {

    //convert sting to Date for checkin and checkout
    //Create Date array that contains all dates between In and Out (new)
    let chIn = new Date(checkin_new);
    let chOut = new Date(checkout_new);
    // console.log("check in date: " + chIn);
    // console.log("check out date: " + chOut);

    var x: string;
    var hotelList: Hotel[] = [];
    for (var i = 0; i < 71; i++) {
      x = i.toString();
      
      var promise = await this.hotelInfo.getHotelData(x);
      var hotel: Hotel = new Hotel();
      hotel = this.hotelInfo.getHotel();
      let date1 = new Date(  (hotel.checkIn) );
      let date2 = new Date( hotel.checkOut )
      //console.log("check in date: " + date1);
      //console.log("check out date: " + date2);

      //hotel.checkIn and hotel.checkout (Timestamp)
      //convert timestamp to date
      //Create Date array that contains all dates between In and Out
      //Find overlap?
      if (cityname.toUpperCase() == hotel.city.toUpperCase()) {
        hotelList.push(hotel);
        this.hotels.push(hotel);
        //console.log(hotel);
        this._observableList.next(hotelList);
      }
    }
  }

  public getObservableList(): Observable<Hotel[]> {
    return this._observableList.asObservable(); 
  }
   
  public getHotels() {
    //console.log(this.hotels);
    return this.hotels;
  }
}

