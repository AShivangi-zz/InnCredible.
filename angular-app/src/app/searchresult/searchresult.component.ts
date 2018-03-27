import { Component, OnInit } from '@angular/core';
import {SearchService} from "../services/search.service";
import {Hotel} from "../models/hotel";
import { ActivatedRoute } from '@angular/router';

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

  public sub: any;

  // Gets the shared service file SharedSearchResultsService which now contains the user entered input
  constructor(private route: ActivatedRoute, private searchService: SearchService) {
    /*this.service = service;
    this.returnedname = service.getInformationModel().cityname; // Gets the user entered city name
    this.returnedcheckindate = service.getInformationModel().checkindate; // Gets the checkindate
    this.returnedcheckoutdate = service.getInformationModel().checkoutdate; // Gets the checkoutdate
    //this.hotelservice.setSearchCity(this.returnedname);
    //this.hotels = this.hotelservice.retriveData(this.returnedname);*/
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.returnedname = params['id'];
      this.returnedcheckindate = params['id2'];
      this.returnedcheckoutdate = params['id3'];
    });

    this.searchService.retriveData(this.returnedname, this.returnedcheckindate, this.returnedcheckoutdate);
  }

}



