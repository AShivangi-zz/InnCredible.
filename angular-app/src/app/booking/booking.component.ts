import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { ReservationService } from './shared/reservation.service';
import { Http } from '@angular/http';
import { HotelInfo } from '../services/hotel-info';
import { Hotel } from '../models/hotel';
import { Reservation } from './shared/reservation.model';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-booking',
  templateUrl: './booking.component.html',
  styleUrls: ['./booking.component.scss'],
  providers: [ReservationService]
})

export class BookingComponent implements OnInit, OnDestroy {

  sub: Subscription;

  private hotelData: Hotel;
  private newResrv: Reservation;

  hotelID: string;
  dataLoaded: boolean;

  constructor(
      private http: Http,
      private reservationService: ReservationService,
      private route: ActivatedRoute,
      private hotelInfo: HotelInfo) {

      this.sub = this.route.params.subscribe(async params => {
        this.hotelID = params['id'];
        await this.hotelInfo.initHotelByID(params['id']);
      });

      this.sub.add(this.hotelInfo.activeHotel.subscribe( value => this.hotelData = value));

      this.reservationService.setHotelID(this.hotelData.hotelID);
      this.sub.add(this.reservationService.activeReservation.subscribe(value => this.newResrv = value));
      this.dataLoaded = true;
  }

  ngOnInit() {
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

}
