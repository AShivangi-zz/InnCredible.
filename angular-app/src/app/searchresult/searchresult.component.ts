import { Component, OnInit } from '@angular/core';
import {SharedSearchResultsService} from "../services/shared-search-results.service";

@Component({
  selector: 'app-searchresult',
  template: `
   <h1>TESTING</h1>
    <h2> {{returnedname}}</h2>
  `,
  styleUrls: ['./searchresult.component.scss']
})
export class SearchresultComponent implements OnInit {

  returnedname = '';
  returnedcheckindate = '';
  returnedcheckoudate = '';

  // Gets the shared service file SharedSearchResultsService which now contains the user entered input
  constructor(private service: SharedSearchResultsService) {
    this.service = service;
    this.returnedname = service.getInformationModel().cityname; // Gets the user entered city name
    this.returnedcheckindate = service.getInformationModel().checkindate;// Gets the checkindate
    this.returnedcheckoudate = service.getInformationModel().checkoutdate;// Gets the checkoutdate
  }
  ngOnInit() {
  }

}
