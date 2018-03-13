import { Component, OnInit } from '@angular/core';
import {SharedSearchResultsService} from '../services/shared-search-results.service';
import {HotelService} from '../services/hotel.service';
import * as firebase from 'firebase';
import {FormsModule} from "@angular/forms";
import {Hotel} from "../hotel";

@Component({
  selector: 'app-searchresult',
  template: `
    <h1>User data</h1> <br>
    <h2> City: {{returnedname}}</h2>
    <h2> Check In: {{returnedcheckindate}}</h2>
    <h2> Check Out: {{returnedcheckoutdate}}</h2>
    <ul>
      <div *ngFor="let hot of hotelList">
          <p>Hotel Name: {{hot?.getName() }} <br>
             Hotel Location: {{hot?.getLocation() }}<br>
             Hotel city: {{hot?.getCity()}} <br>
             Hotel review: {{hot?.getReview()}} <br>
             Hotel rating: {{hot?.getRating()}} <br>
             Hotel price: {{hot?.getPrice()}}
          </p>
      </div>
    </ul>
  `,
  styleUrls: ['./searchresult.component.scss'],
})
export class SearchresultComponent implements OnInit {
  returnedname = '';
  returnedcheckindate = '';
  returnedcheckoutdate = '';
  hotelList = new Array();
  // Gets the shared service file SharedSearchResultsService which now contains the user entered input
  constructor(private service: SharedSearchResultsService, private hotelService: HotelService) {
    this.service = service;
    this.returnedname = service.getInformationModel().cityname; // Gets the user entered city name
    this.returnedcheckindate = service.getInformationModel().checkindate; // Gets the checkindate
    this.returnedcheckoutdate = service.getInformationModel().checkoutdate; // Gets the checkoutdate
    this.hotelList = this.hotelService.getData(this.returnedname);
    /*for(var i = 0; i < this.hotelList.length; i++) {
      console.log(this.hotelList[i].getName());
    }*/
  }


  ngOnInit() {}
}


