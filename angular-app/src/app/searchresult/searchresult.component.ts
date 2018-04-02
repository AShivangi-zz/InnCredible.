import { Component, OnInit } from '@angular/core';
import {SearchService} from "../services/search.service";
import {Hotel} from "../models/hotel";
import { ActivatedRoute } from '@angular/router';
import {FilterService} from "../services/filter.service";
import {Observable} from "rxjs/Observable";
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
  hotelsObs: Observable<Hotel[]>;

  public sub: any;

  // Gets the shared service file SharedSearchResultsService which now contains the user entered input
  constructor(private route: ActivatedRoute, public searchService: SearchService, private filterService: FilterService) {}

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.returnedname = params['id'];
      this.returnedcheckindate = params['id2'];
      this.returnedcheckoutdate = params['id3'];
    });
    this.getData();
  }

  async onRatingsFilter(rating: number) {
    
    await this.filterService.filterByRating(this.hotels, rating);
    this.hotelsObs = this.filterService.getObservableList();
  }

  async getData(){
    this.hotels = [];
    await this.searchService.retriveData(this.returnedname, this.returnedcheckindate, this.returnedcheckoutdate);
    this.hotels = this.searchService.getHotels();

    this.hotelsObs = this.searchService.getObservableList();
    
  }

}



