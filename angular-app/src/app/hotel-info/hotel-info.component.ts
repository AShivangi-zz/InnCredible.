import { Component, OnInit } from '@angular/core';
import { HotelInfo } from "../services/hotel-info";

@Component({
  selector: 'app-hotel-info',
  templateUrl: './hotel-info.component.html',
  styleUrls: ['./hotel-info.component.scss']
})

export class HotelInfoComponent implements OnInit {

  constructor(private hotelInfo: HotelInfo) {
    // this.hotelInfo.setHotelId('0');

   }

  ngOnInit() {

  }

  }

