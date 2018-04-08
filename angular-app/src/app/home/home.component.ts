import { Component, OnInit, ViewChild } from '@angular/core';
import { AngularFireAuth } from 'angularfire2/auth';
import { Router } from '@angular/router';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  @ViewChild("placesRef") placesRef: GooglePlaceDirective;

  start: string;
  end: string;

  cityname: string;
  checkindate: string;
  checkoutdate: string;

  done: boolean = false;

  constructor(public afa: AngularFireAuth, private router: Router) { }

  // This gets the information from the searchformdata in home.component.html
  onSubmit(searchformdata) {

    if (searchformdata.valid) {
      if(this.cityname != null) {
        this.router.navigate(['/searchresults', this.cityname, searchformdata.value.checkindate, searchformdata.value.checkoutdate]);
      }
      else {
        this.router.navigate(['/searchresults', searchformdata.value.cityname.toLowerCase(), searchformdata.value.checkindate, searchformdata.value.checkoutdate]);
      }
    }
  }

  ngOnInit() {
  }

  handleAddressChange(event) {
    var location = event.formatted_address;
    var segments = location.split(',');
    this.cityname = segments[0].toLowerCase();
  }

}

