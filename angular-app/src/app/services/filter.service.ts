import { Injectable } from '@angular/core';
import {Hotel} from "../models/hotel";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class FilterService {
  filteredHotels: Hotel[];
  _observableList: BehaviorSubject<Hotel[]>;
  currentFilter = this._observableList.asObservable();

  constructor() {
    // this.reservationService.activeReservation.subscribe(value => this.reservation = value);
  }

  async filterByRating(hotel: Hotel[], rating: number){
    await this.currentFilter.subscribe(value => this.filteredHotels = value);
    const hotelList: Hotel[] = [];

    for(var i = 0; i< hotel.length; i++){

      let rating_str = hotel[i].rating;
      var colonIndex = rating_str.indexOf(":")+1;
      var slashIndex = rating_str.indexOf("/");
      var rat = Number(rating_str.slice(colonIndex, slashIndex));
      // const rat = hotel[i].ratingValue;
      if (rat >= rating) {
        hotelList.push(hotel[i]);
      }
    }
    this._observableList.next(hotelList);
    if (hotelList.length === 0) {
      return true;
    }
    return false;
  }

  filterByAmenity(amenity: any) {
    const curHotelFilter: Hotel[] = this.filteredHotels;
    const amenFilter: Hotel[] = [];

    if (amenity.checked) {
      alert(curHotelFilter.length);
      dance:
      for (let h = 0; h < curHotelFilter.length; h++){
        const amens = curHotelFilter[h].amenities;
        for (let a = 0; a < amens.length; a++) {
          if (amens[a].includes(amenity.name)) {
            amenFilter.push(curHotelFilter[h]);
            break dance;
          }
        }
      }
    } else {
      /* not checked */
    }
    this.filteredHotels = amenFilter;
    this._observableList.next(amenFilter);
    //
    // if(filteredHotels.length == 0) {
    //   return true;
    // }
    // return false;
  }

  public getObservableList(): Observable<Hotel[]> {
    return this.currentFilter;
  }
}
