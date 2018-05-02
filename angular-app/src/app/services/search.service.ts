import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Hotel} from "../models/hotel";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {HotelInfo} from "./hotel-info"
@Injectable()
export class SearchService {
  private foundHotels: Hotel[] =  [];
  private _observableList = new BehaviorSubject<Hotel[]>(null);
  public currentSearch = this._observableList.asObservable();

  constructor(private hotelInfo: HotelInfo) {
  }

  public async retriveData(cityname: string, checkin_new: string, checkout_new: string) {

    // convert sting to Date for checkin and checkout
    // Create Date array that contains all dates between In and Out (new)
    // let chIn = new Date(checkin_new);
    // let chOut = new Date(checkout_new);

    let x: string;
    for (var i = 0; i < 71; i++) {
      x = i.toString();

      await this.hotelInfo.getHotelData(x);
      const hotel = this.hotelInfo.getHotel();
      // const date1 = new Date(  (hotel.checkIn) );
      // const date2 = new Date( hotel.checkOut )

      // hotel.checkIn and hotel.checkout (Timestamp)
      // convert timestamp to date
      // Create Date array that contains all dates between In and Out
      // Find overlap?
      if (cityname.toUpperCase() === hotel.city.toUpperCase()) {
        this.foundHotels.push(hotel);
      }
    }

    this._observableList.next(this.foundHotels);
  }
}

