import {Component, OnInit, ViewChild} from '@angular/core';
import { SearchService } from "../services/search.service";
import { Hotel } from "../models/hotel";
import { Router, ActivatedRoute } from '@angular/router';
import { FilterService } from "../services/filter.service";
import { UserProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { Observable } from "rxjs/Observable";
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.scss'],
})

export class SearchresultComponent implements OnInit {

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;

  returnedname = '';
  returnedcheckindate = '';
  returnedcheckoutdate = '';

  hotels: Hotel[]=[];
  hotelsObs: Observable<Hotel[]>;
  isEmpty = false;

  faves: string[] = [];

  cityname: string;
  citynameAuto: string;
  checkindate: string;
  checkoutdate: string;

  options = {
    types: ['(cities)'],
    componentRestrictions: {country: 'usa'}
  };

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
    private profileService: UserProfileService,
    public spinner: NgxSpinnerService) { }

  ngOnInit() {

    //this.profileService.getUserInfo();

    this.sub = this.route.params.subscribe(params => {
      this.returnedname = params['id'];
      this.returnedcheckindate = params['id2'];
      this.returnedcheckoutdate = params['id3'];
    });
    this.getData();
  }

  onSubmit(searchformdata)
  {
    if (searchformdata.valid) {
      if(this.citynameAuto != null) {
        this.router.navigate(['/searchresults', this.citynameAuto, searchformdata.value.checkindate, searchformdata.value.checkoutdate]);
        window.location.reload();
      }
      else {
        this.router.navigate(['/searchresults', searchformdata.value.cityname, searchformdata.value.checkindate, searchformdata.value.checkoutdate]);
        window.location.reload();
      }
    }
  }

  handleAddressChange(event) {
    var location = event.formatted_address;
    var segments = location.split(',');
    this.citynameAuto = segments[0];
  }

  async onRatingsFilter(rating: number) {

    this.isEmpty = await this.filterService.filterByRating(this.hotels, rating);
    if (!this.isEmpty) {
      this.hotelsObs = this.filterService.getObservableList();
    }
  }

  async getData() {
    this.spinner.show();
    this.hotels = [];
    await this.searchService.retriveData(this.returnedname, this.returnedcheckindate, this.returnedcheckoutdate);
    this.hotels = this.searchService.getHotels();
    this.hotelsObs = this.searchService.getObservableList();


    this.faves = [];
    await this.profileService.pullFavHotels();
    this.faves = this.profileService.getFavesList();
    this.spinner.hide();
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



