import { Component, OnInit } from '@angular/core';
import {SharedSearchResultsService} from '../services/shared-search-results.service';
import {HotelService} from "../services/hotel.service";

@Component({
  selector: 'app-searchresult',
  template: `
    <h1>User data</h1> <br>
    <h2> City: {{returnedname}}</h2>
    <h2> Check In: {{returnedcheckindate}}</h2>
    <h2> Check Out: {{returnedcheckoutdate}}</h2>
    <ul>
      <div *ngFor="let hotel of hotelservice.ObservableList | async">
          <p>Hotel Name: {{hotel.getName() }} <br>
             Hotel Location: {{hotel.getLocation() }}<br>
             Hotel city: {{hotel.getCity()}} <br>
             Hotel review: {{hotel.getReview()}} <br>
             Hotel rating: {{hotel.getRating()}} <br>
             Hotel price: {{hotel.getPrice()}}
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

  // Gets the shared service file SharedSearchResultsService which now contains the user entered input
  constructor(private service: SharedSearchResultsService, private hotelservice: HotelService) {
    this.service = service;
    this.returnedname = service.getInformationModel().cityname; // Gets the user entered city name
    this.returnedcheckindate = service.getInformationModel().checkindate; // Gets the checkindate
    this.returnedcheckoutdate = service.getInformationModel().checkoutdate; // Gets the checkoutdate
    this.hotelservice.retriveData(this.returnedname);
  }

  ngOnInit() {
  }

}



