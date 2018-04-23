import { Component, OnInit, ViewChild } from '@angular/core';
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

  hotels: Hotel[] = [];
  hotelsObs: Observable<Hotel[]>;
  isEmpty = false;
  amenities: any;
  faves: string[] = [];

  cityname: string;
  citynameAuto: string;
  checkindate: string;
  checkoutdate: string;

  dtToday = (new Date).toISOString().split('T')[0];

  options = {
    types: ['(cities)'],
    componentRestrictions: { country: 'usa' }
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
    public spinner: NgxSpinnerService) {

      this.amenities = [
        {name:'Car Parking', checked:false},
        {name:'Non Smoking', checked:false},
        {name:'Disabled Facilities', checked:false},
        {name:'Shops', checked:false},
        {name:'Fitness Center', checked:false},
        {name:'Pet allowed', checked:false},
        {name:'Outdoor Swimmingpool', checked:false},
        {name:'Sauna', checked:false},
        {name:'Lifts', checked:false},
        {name:'Restaurant', checked:false},
        {name:'Television', checked:false},
        {name:'Radio', checked:false},
        {name:'Hairdryer', checked:false},
        {name:'High Speed Modem', checked:false}
      ]

    }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.returnedname = params['id'];
      this.returnedcheckindate = params['id2'];
      this.returnedcheckoutdate = params['id3'];
    });

    this.getData();


  }

  /* ====== sortTypChange() =======
    I need a way to convert between the display values in the drop down and the actual named variables
    in Hotel.ts as well as set the direction of sort.
   */
  sortTypChange() {
    switch (this.sortTyp) {
      case 'Highest Price':
        this.order = 'price';
        this.reverse = true;
        break;
      case 'Lowest Price':
        this.order = 'price';
        this.reverse = false;
        break;
      case 'Name (A-Z)':
        this.order = 'name';
        this.reverse = false;
        break;
      case 'Name (Z-A)':
        this.order = 'name';
        this.reverse = true;
        break;
      case 'Highest Rating':
        this.order = 'ratingValue';
        this.reverse = true;
        break;
      case 'Lowest Rating':
        this.order = 'ratingValue';
        this.reverse = false;
        break;
    }
  }

  updateDate() {
    var checkIn = (<HTMLInputElement>document.getElementById('checkindate'));
    var checkOut = (<HTMLInputElement>document.getElementById('checkoutdate'));

    checkOut.setAttribute("min", checkIn.value);
  }

  onSubmit(searchformdata) {
    if (searchformdata.valid) {
      if (this.citynameAuto != null) {
        this.router.navigate(['/searchresults', this.citynameAuto, searchformdata.value.checkindate, searchformdata.value.checkoutdate]);
        window.location.reload();
      }
      else {
        this.router.navigate(['/searchresults', searchformdata.value.cityname, searchformdata.value.checkindate, searchformdata.value.checkoutdate]);
        window.location.reload();
      }
    }
  }

  onApply(applyAmenities) {


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
    this.hotelsObs.subscribe(results => {
      if (results.length === 0) {
        (<HTMLSpanElement>document.getElementById('nohotels')).style.visibility = 'visible';
      }
    });


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

  async onCheckboxChange(amenity: any) {
    if (this.isEmpty) {
      await this.onRatingsFilter(1);
    }
    await this.filterService.filterByAmenity(amenity);
  }
}



