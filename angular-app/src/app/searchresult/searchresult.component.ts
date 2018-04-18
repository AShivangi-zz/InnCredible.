import { Component, OnInit } from '@angular/core';
import { SearchService } from "../services/search.service";
import { Hotel } from "../models/hotel";
import { Router, ActivatedRoute } from '@angular/router';
import { FilterService } from "../services/filter.service";
import { UserProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { Observable } from "rxjs/Observable";

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
  isEmpty = false;

  faves: string[] = [];

  sortOptions = ['Lowest Price', 'Highest Price', 'Name (A-Z)', 'Name (Z-A)', 'Highest Rating', 'Lowest Rating'];
  sortTyp = 'Lowest Price';
  order = 'price';
  reverse = false;

  loggedIn: boolean;

  public sub: any;

  // Gets the shared service file SharedSearchResultsService which now contains the user entered input
  constructor(private route: ActivatedRoute, 
    public router: Router,
    public searchService: SearchService,
    private filterService: FilterService,
    private profileService: UserProfileService) { }

  ngOnInit() {
    //this.profileService.getUserInfo();

    this.sub = this.route.params.subscribe(params => {
      this.returnedname = params['id'];
      this.returnedcheckindate = params['id2'];
      this.returnedcheckoutdate = params['id3'];
    });
    this.getData();
  }

  async onRatingsFilter(rating: number) {
    
    this.isEmpty = await this.filterService.filterByRating(this.hotels, rating);
    if (!this.isEmpty) {
      this.hotelsObs = this.filterService.getObservableList();
    }
  }

  async getData() {
    this.hotels = [];
    await this.searchService.retriveData(this.returnedname, this.returnedcheckindate, this.returnedcheckoutdate);
    this.hotels = this.searchService.getHotels();
    this.hotelsObs = this.searchService.getObservableList();


    this.faves = [];
    await this.profileService.pullFavHotels();
    this.faves = this.profileService.getFavesList();
  }

  checkFavorite(hotelID) {
    var favList: Hotel[] = [];
    for (var i = 0; i < this.faves.length; i++) {
      if (this.faves[i] === hotelID) {
        return true;
      }
    }
    return false;
  }

  goBack(): void {
    this.router.navigateByUrl('/home');
    window.location.reload();
  }

}



