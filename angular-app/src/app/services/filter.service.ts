import { Injectable } from '@angular/core';
import {Hotel} from "../models/hotel";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class FilterService {

  _observableList: BehaviorSubject<Hotel[]> = new BehaviorSubject([]);

  constructor() { }
  
  filterByRating(hotel:Hotel[], rating: number){
    var filteredHotels: Hotel[] = [];

    for(var i = 0; i< hotel.length; i++){

      let rating_str = hotel[i].rating;
      var colonIndex = rating_str.indexOf(":")+1;
      var slashIndex = rating_str.indexOf("/");
      var rat = Number(rating_str.slice(colonIndex, slashIndex));
      if(rat === rating || rat > rating) {
        filteredHotels.push(hotel[i]);
        this._observableList.next(filteredHotels);
      }
      
    }
    if(filteredHotels.length == 0) {
      return true;
    }
    return false;
  }

  public getObservableList(): Observable<Hotel[]> {
    return this._observableList.asObservable(); 
  }
}
