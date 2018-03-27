import { Component, OnInit } from '@angular/core';
import {SharedSearchResultsService} from '../services/shared-search-results.service';
import {SearchService} from "../services/search.service";
import {Hotel} from "../models/hotel";

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.scss'],
})

export class SearchresultComponent implements OnInit {
  returnedname = '';
  returnedcheckindate = '';
  returnedcheckoutdate = '';
  hotels: Hotel[];

  // Gets the shared service file SharedSearchResultsService which now contains the user entered input
  constructor(private service: SharedSearchResultsService, private searchService: SearchService) {
    this.service = service;
    this.returnedname = service.getInformationModel().cityname; // Gets the user entered city name
    this.returnedcheckindate = service.getInformationModel().checkindate; // Gets the checkindate
    this.returnedcheckoutdate = service.getInformationModel().checkoutdate; // Gets the checkoutdate
    //this.hotelservice.setSearchCity(this.returnedname);
    //this.hotels = this.hotelservice.retriveData(this.returnedname);
  }

  ngOnInit() {
    this.searchService.retriveData(this.returnedname);
  }

}



