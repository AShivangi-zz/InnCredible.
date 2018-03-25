import { Component, OnInit } from '@angular/core';
import { HotelInfo } from "../../services/hotel-info";
import {ActivatedRoute} from "@angular/router";
import * as firebase from "firebase";

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  private hotelName: string;
  private hotelAddr: string;
  private hotelID:  string;

  constructor(private hotel: HotelInfo, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.hotelID = params['id'];
    });

    this.hotel.subscribeName.subscribe(msg => this.hotelName = msg);
    this.hotel.subscribeLocation.subscribe(msg => this.hotelAddr = msg);

    const id_ref =  firebase.database().ref('/hotel_id');
    id_ref.once('value').then((snapshot) => {
      const count = snapshot.numChildren();
      for (let i = 0; i < count; i++) {
        const number = i.toString();
        if (snapshot.child(number).val() === this.hotelID) {
          this.hotel.getHotelData(number);
        }
      }
    });
  }

  onSubmit() {
    alert(this.hotelName);
  }
}
