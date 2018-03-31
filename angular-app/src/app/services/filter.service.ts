import { Injectable } from '@angular/core';
import {Hotel} from "../models/hotel";

@Injectable()
export class FilterService {

  constructor() { }
  
  filterByRating(hotel:Hotel[], rating: number){
    var filteredHotels: Hotel[] = [];
   // console.log(hotel.length);

    for(var i = 0; i< hotel.length; i++){

      let rating_str = hotel[i].rating;
      var colonIndex = rating_str.indexOf(":")+1;
      var slashIndex = rating_str.indexOf("/");
      var rat = Number(rating_str.slice(colonIndex, slashIndex));
      //console.log(rat);
      if(rat === rating || rat > rating) {
        filteredHotels.push(hotel[i]);
      }
      
    }
    return filteredHotels;
  }
}
