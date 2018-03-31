import { Injectable } from '@angular/core';
import {Hotel} from "../models/hotel";

@Injectable()
export class FilterService {

  constructor() { }
  
  filterByRating(hotel:Hotel[], rating: number){
    var filteredHotels: Hotel[] = [];

    for(var i = 0; i< hotel.length; i++){

      let rating = hotel[i].rating;
      var colonIndex = rating.indexOf(":")+1;
      var slashIndex = rating.indexOf("/");
      var rat = Number(rating.slice(colonIndex, slashIndex));

      if(rat == Number(rating) || rat > Number(rating)) {
        filteredHotels.push(hotel[i]);
      }
      
    }
    return filteredHotels;
  }
}
