import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {Hotel} from "../hotel";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";

@Injectable()
export class HotelService {
  constructor() {
  }

  _observableList: BehaviorSubject<Hotel[]> = new BehaviorSubject([]);

  public get ObservableList(): Observable<Hotel[]> {return this._observableList.asObservable(); }

  public retriveData(cityname: string) {
    const ref = firebase.database().ref("/hotels");
    var x: string;
    var hotelList: Hotel[] = [];
    for (var i = 0; i < 71; i++) {
      x = i.toString();
      ref.child(x)
        .once("value")
        .then((snapshot) => {
            var hotel = new Hotel();
            hotel.setCity(snapshot.child('/location/city').val());
            hotel.setName(snapshot.child('name').val());
            hotel.setLocation(snapshot.child('/location/all').val());
            hotel.setPrice(snapshot.child('price').val());
            hotel.setImage(snapshot.child('/images/0').val());
            hotel.setRating(snapshot.child('/rating/rating').val());
            hotel.setRatingImg(snapshot.child('/rating/rating-img').val());
            hotel.setReviewNum(snapshot.child('/rating/reviews').val());
            if (cityname == hotel.getCity()) {
              hotelList.push(hotel);
              console.log(hotel);
              this._observableList.next(hotelList);
            }
        });
    }
  }
}

