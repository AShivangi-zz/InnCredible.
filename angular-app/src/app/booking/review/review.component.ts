import { Component, OnInit } from '@angular/core';
import { HotelInfo } from '../../services/hotel-info';
import { ActivatedRoute } from '@angular/router';
import { Hotel } from '../../hotel';
import {UserProfileService} from '../../services/profile.service';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {
  private taxRate: number;
  private hotelData: Hotel;

  constructor(private hotel: HotelInfo, private route: ActivatedRoute, private userProfileService: UserProfileService) {
    this.hotel.activeHotel.subscribe(value => this.hotelData = value);
    this.taxRate = 8.25;
  }

  ngOnInit() {
  }

  applyRewardAmnt(): number {
    /* TODO if the user selects Skip or redeem*/
    //if(redeem is clicked)
    var x = this.userProfileService.getRewardPoints()/25;
    return x;
    /* TODO set reward points to 0 if the user redeems*/
    //else if skip is clicked
    //return 0;
  }
  calcTax() {
    return (parseFloat(this.hotelData.getPrice()) * (this.taxRate / 100)).toFixed(2);
  }

  orderTotal() {
    return (( parseFloat(this.hotelData.getPrice()) * (this.taxRate / 100))
            + parseFloat(this.hotelData.getPrice())
            - this.applyRewardAmnt()).toFixed(2);
  }

  onSubmit() {

  }
}
