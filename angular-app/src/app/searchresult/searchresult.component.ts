import { Component, OnInit, ViewChild } from '@angular/core';
import { SearchService } from "../services/search.service";
import { Hotel } from "../models/hotel";
import { Router, ActivatedRoute } from '@angular/router';
import { FilterService } from "../services/filter.service";
import { UserProfileService } from '../services/profile.service';
import { AuthService } from '../services/auth.service';
import { Observable } from 'rxjs/Observable';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { NgxSpinnerService } from 'ngx-spinner';
import { HotelInfo } from "../services/hotel-info";

function boxFilter(amenity) {
  return amenity.checked;
}

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.scss'],
})

export class SearchresultComponent implements OnInit {

  @ViewChild('placesRef') placesRef: GooglePlaceDirective;

  returnedname = '';
  returnedcheckindate = '';
  returnedcheckoutdate = '';

  hotels: Hotel[] = [];
  foundHotels: Hotel[] = [];
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

  public sub: any;

  // Gets the shared service file SharedSearchResultsService which now contains the user entered input
  constructor(private route: ActivatedRoute,
    public router: Router,
    public searchService: SearchService,
    private filterService: FilterService,
    private profileService: UserProfileService,
    public spinner: NgxSpinnerService,
    public hotelInfo: HotelInfo) {
    this.filterService.currentFilter.subscribe(value => this.hotels = value);
    this.searchService.currentSearch.subscribe( value => this.foundHotels = value);

      this.amenities = [
        {name: 'Car Parking', checked: false},
        {name: 'Non Smoking', checked: false},
        {name: 'Disabled Facilities', checked: false},
        {name: 'Shops', checked: false},
        {name: 'Fitness Center', checked: false},
        {name: 'Pet allowed', checked: false},
        {name: 'Outdoor Swimmingpool', checked: false},
        {name: 'Sauna', checked: false},
        {name: 'Lifts', checked: false},
        {name: 'Restaurant', checked: false},
        {name: 'Television', checked: false},
        {name: 'Radio', checked: false},
        {name: 'Hairdryer', checked: false},
        {name: 'High Speed Modem', checked: false}
      ];

    }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.returnedname = params['id'];
      this.returnedcheckindate = params['id2'];
      this.returnedcheckoutdate = params['id3'];
    });

    if (this.hotels === null) {
      this.getData();
      // (<HTMLSpanElement>document.getElementById('nohotels')).style.visibility = 'visible';
    } else {
      // (<HTMLSpanElement>document.getElementById('nohotels')).style.visibility = 'hidden';
    }
  }

  pickHotel(hotel: Hotel) {
    this.hotelInfo.setActiveHotel(hotel);

    // for (let i = 0; i < this.hotels.length; i++) {
    //   if (this.hotels[i].hotelID === id) {
    //     console.log(this.hotels[i].hotelID + ': ' + this.hotels[i].amenities.length);
    //     for (let a = 0; a < this.hotels[i].amenities.length; a++) {
    //       console.log('>' + this.hotels[i].amenities[a]);
    //     }
    //   }
    // }
  }

  updateDate() {
    const checkIn = (<HTMLInputElement>document.getElementById('checkindate'));
    const checkOut = (<HTMLInputElement>document.getElementById('checkoutdate'));

    checkOut.setAttribute('min', checkIn.value);
  }

  onSubmit(searchformdata) {
    if (searchformdata.valid) {
      if (this.citynameAuto != null) {
        this.router.navigate(['/searchresults',
            this.citynameAuto,
            searchformdata.value.checkindate,
            searchformdata.value.checkoutdate]);
        window.location.reload();
      } else {
        this.router.navigate(['/searchresults',
            searchformdata.value.cityname,
            searchformdata.value.checkindate,
            searchformdata.value.checkoutdate]);
        window.location.reload();
      }
    }
  }

  handleAddressChange(event) {
    const location = event.formatted_address;
    const segments = location.split(',');
    this.citynameAuto = segments[0];
  }

  checkFilter() {
    if (this.hotels === null || (this.hotels != null && this.hotels.length === 0)) {
      this.filterService.loadFilter(this.foundHotels);
    }
  }

  onRatingsFilter(rating: number) {
    this.checkFilter();

console.log('Before - Filter: ' + this.hotels.length + ' | ' + 'Found: ' + this.foundHotels.length);
    this.filterService.filterByRating(rating, this.foundHotels, this.amenities.filter(boxFilter));

console.log('After - Filter: ' + this.hotels.length + ' | ' + 'Found: ' + this.foundHotels.length);

  }

  onCheckboxChange(amenity: any) {
console.log('Before - Filter: ' + this.hotels.length + ' | ' + 'Found: ' + this.foundHotels.length);

    this.checkFilter();
    if (amenity.checked) {
      this.filterService.checkAmenity(amenity);
    } else {
      this.filterService.uncheckAmenity(amenity, this.amenities.filter(boxFilter), this.foundHotels);
    }
console.log('After - Filter: ' + this.hotels.length + ' | ' + 'Found: ' + this.foundHotels.length);
  }

  async getData() {
    this.spinner.show();
    await this.searchService.retriveData(this.returnedname, this.returnedcheckindate, this.returnedcheckoutdate);
    this.filterService.loadFilter(this.foundHotels);
    // this.hotelsObs = this.searchService.getObservableList();
    // this.filterService.currentFilter.subscribe(results => {
    //   if (results.length === 0) {
    //     (<HTMLSpanElement>document.getElementById('nohotels')).style.visibility = 'visible';
    //   }
    // });


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

}



