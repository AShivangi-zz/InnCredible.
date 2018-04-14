import { Component, OnInit } from '@angular/core';
import { SearchService} from "../services/search.service";
import { Hotel} from "../models/hotel";
import { Router, ActivatedRoute } from '@angular/router';
import { FilterService} from "../services/filter.service";
import { Observable} from "rxjs/Observable";
import { UserProfileService } from '../services/profile.service';

@Component({
  selector: 'app-searchresult',
  templateUrl: './searchresult.component.html',
  styleUrls: ['./searchresult.component.scss'],
})

export class SearchresultComponent implements OnInit {
  returnedname = '';
  returnedcheckindate = '';
  returnedcheckoutdate = '';

  hotels: Hotel[] = [];
  hotelsObs: Observable<Hotel[]>;
  isEmpty = false;

  faves: string[] = [];
  favesObs: Observable<string[]>;

  sortOptions = ['Lowest Price', 'Highest Price', 'Name (A-Z)', 'Name (Z-A)', 'Highest Rating', 'Lowest Rating'];
  sortTyp = 'Lowest Price';
  order = 'price';
  reverse = false;

  public sub: any;

  // Gets the shared service file SharedSearchResultsService which now contains the user entered input
  constructor(
    private route: ActivatedRoute,
    public router: Router,
    public searchService: SearchService,
    private filterService: FilterService,
    private profileService: UserProfileService) {  }

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

  async onRatingsFilter(rating: number) {

    this.isEmpty = await this.filterService.filterByRating(this.hotels, rating);
    if(!this.isEmpty) {
      this.hotelsObs = this.filterService.getObservableList();
    }
  }

  async getData(){
    this.hotels = [];
    await this.searchService.retriveData(this.returnedname, this.returnedcheckindate, this.returnedcheckoutdate);
    this.hotels = this.searchService.getHotels();

    this.faves = [];
    await this.profileService.pullFavHotels(this.hotels);
    this.faves = this.profileService.getFavesList();

    this.favesObs = this.profileService.getFavesObs();
    console.log(this.faves);

  }

  goBack(): void {
    this.router.navigateByUrl('/home');
    window.location.reload();
  }

}



