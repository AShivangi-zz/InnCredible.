import { Component, OnInit } from '@angular/core';
import {SharedSearchResultsService} from '../services/shared-search-results.service';
import {HotelService} from "../services/hotel.service";

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
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

  ngOnInit() {}

}



