import { Component, OnInit } from '@angular/core';
import {hotel-info} from "../services/hotel-info";
//import {AngularFire} from "angularfire5";

@Component({
  selector: 'app-hotel-info',
  templateUrl: './hotel-info.component.html',
  styleUrls: ['./hotel-info.component.scss']
})

export class HotelInfoComponent implements OnInit {
  toolbarTitle = 'CP2';
  amenities: result[];

  constructor(private af : AngularFire) {
   }

  ngOnInit() {
     this.af.database.list('/amenities').subscribe(users => { 
     	this.amenities =  amenities
     });
      
  }

}
