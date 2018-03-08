import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from 'angularfire2/auth';
import {Router} from '@angular/router';
import {SharedSearchResultsService} from "../services/shared-search-results.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public afa: AngularFireAuth, private router: Router, private service: SharedSearchResultsService) {
    /*this.afa.authState.subscribe(auth => {
      if(auth) {
        this.name = auth;
      }
    });*/
    this.service = service; // This gets the service file information

  }

  // This gets the information from the searchformdata in home.component.html
  onSubmit(searchformdata)
  {
    if (searchformdata.valid) {
      // Store the information that the user entered into the service attributes
      this.service.saveInformation(searchformdata.value.cityname, searchformdata.value.checkindate, searchformdata.value.checkoutdate);
      // Route to the searchresult page/component
      this.router.navigateByUrl('/searchresult');
    }
  }



  ngOnInit() {


  }

}
