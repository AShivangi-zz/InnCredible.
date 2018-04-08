import { environment } from './../environments/environment';

import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import {HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { GooglePlaceModule } from "ngx-google-places-autocomplete";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarModule } from 'angular-calendar';
// Routes
import { routes } from './app.router';

// Firebase
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule} from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';

// Components
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ProfileComponent } from './profile/profile.component';
import { ContactComponent } from './contact/contact.component';
import {HotelInfoComponent} from './hotel-info/hotel-info.component';
import { BookingComponent } from './booking/booking.component';
import { ReservationComponent } from './booking/reservation/reservation.component';
import { RewardsComponent } from './booking/rewards/rewards.component';
import { ReviewComponent } from './booking/review/review.component';
import { CheckoutComponent } from './booking/checkout/checkout.component';
import { ConfirmationComponent } from './booking/confirmation/confirmation.component';
import { ErrDisplayComponent } from './booking/err-display/err-display.component';

// Services
import { AuthGuard } from './services/auth-guard.service';
import {AuthService} from './services/auth.service';
import {UserProfileService} from './services/profile.service';
import {HotelInfo} from './services/hotel-info';
import { PolicyComponent } from './policy/policy.component';
import { ReservationService} from './booking/shared/reservation.service';
import { SearchresultComponent } from './searchresult/searchresult.component';
import {SearchService} from './services/search.service';
//Models
import {Booking} from './models/booking'
import {Hotel} from './models/hotel';

import {FilterService} from './services/filter.service';
import { MybookingsComponent } from './profile/mybookings/mybookings.component';
import { FavoritesComponent } from './profile/favorites/favorites.component';
import { CalendarComponent } from './profile/calendar/calendar.component';
import { UserprofileComponent } from './profile/userprofile/userprofile.component';
import { RewardpointsComponent } from './profile/rewardpoints/rewardpoints.component';
import { HistoryComponent } from './profile/history/history.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    RegisterComponent,
    NavbarComponent,
    ProfileComponent,
    ContactComponent,
    HotelInfoComponent,
    PolicyComponent,
    BookingComponent,
    ReservationComponent,
    SearchresultComponent,
    RewardsComponent,
    ReviewComponent,
    CheckoutComponent,
    ConfirmationComponent,
    ErrDisplayComponent,
    MybookingsComponent,
    FavoritesComponent,
    CalendarComponent,
    UserprofileComponent,
    RewardpointsComponent,
    HistoryComponent,
  ],
  imports: [
    GooglePlaceModule,
    ReactiveFormsModule,
    BrowserModule,
    FormsModule,
    HttpModule,
    AngularFireDatabaseModule,
    AngularFireModule,
    AngularFireAuthModule,
    AngularFireModule.initializeApp(environment.firebase),
    routes,
    BrowserAnimationsModule,
    CalendarModule.forRoot()
  ],
  providers:
    [ AuthGuard,
      AuthService,
      UserProfileService,
      ReservationService,
      SearchService,
      HotelInfo,
      Hotel,
      FilterService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
