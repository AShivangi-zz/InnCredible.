import { Component, OnInit } from '@angular/core';
import {SearchService} from "../services/search.service";
import {Hotel} from "../models/hotel";
import { ActivatedRoute } from '@angular/router';
import {FilterService} from "../services/filter.service";
import { Observable } from '@firebase/util';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.scss'],
})

export class SearchresultComponent implements OnInit {
  returnedname = '';
  returnedcheckindate = '';
  returnedcheckoutdate = '';
  hotels: Hotel[]=[];
  filteredHotels: Hotel[]= [];

  public sub: any;

  // Gets the shared service file SharedSearchResultsService which now contains the user entered input
  constructor(private route: ActivatedRoute, private searchService: SearchService, private filterService: FilterService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.returnedname = params['id'];
      this.returnedcheckindate = params['id2'];
      this.returnedcheckoutdate = params['id3'];
    });

    this.getFilteredData();
    
  }

  onRatingsFilter() {
    //console.log(this.hotels.length);
    this.filteredHotels = this.filterService.filterByRating(this.hotels, 4); 
    console.log(this.filteredHotels);

  }

  async getFilteredData(){
    await this.searchService.retriveData(this.returnedname, this.returnedcheckindate, this.returnedcheckoutdate);
    this.hotels = this.searchService.getHotels();
//console.log(this.hotels.length);
     this.onRatingsFilter();
  }

}



