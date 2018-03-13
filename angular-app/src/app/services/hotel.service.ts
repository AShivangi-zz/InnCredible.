import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Hotel} from "../hotel";

@Injectable()
export class HotelService {
  constructor() {
  }

  city: string;
  name: string;
  location: string;
  price: string;
  image: URL;
  rating: string;
  ratingImg: URL;
  review_num: string;
  hotel: Hotel

  public getData(cityname: string): any {
    const ref = firebase.database().ref("/hotels");
    var x: string;
    var allHotels = new Array(71);

    for (var i = 0; i < 71; i++) {
      this.hotel = new Hotel();
      x = i.toString();
      ref.child(x)
        .once("value")
        .then((snapshot) => {
          this.hotel.setName(snapshot.child('name').val());
          this.hotel.setCity(snapshot.child('/location/city').val());
          this.hotel.setLocation(snapshot.child('/location/all').val());
          this.hotel.setPrice(snapshot.child('price').val());
          this.hotel.setImage(snapshot.child('/images/0').val());
          this.hotel.setRating(snapshot.child('/rating/rating').val());
          this.hotel.setRatingImg(snapshot.child('/rating/rating-img').val());
          this.hotel.setReviewNum(snapshot.child('/rating/reviews').val());

          if (cityname == this.hotel.getCity()) {
            console.log("Added to array");
            //hotel = new Hotel(this.name, this.city, this.location, this.price, this.image, this.rating, this.ratingImg, this.review_num);
            allHotels.push(this.hotel);
             console.log(this.hotel.getCity());
             console.log(this.hotel.getName());
          }
        });

    }
    return allHotels;
  }
}
