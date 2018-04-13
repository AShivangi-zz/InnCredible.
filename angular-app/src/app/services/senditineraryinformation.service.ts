import { Injectable } from '@angular/core';
import {Itineraryinformation} from "../itineraryinformation";

@Injectable()
export class SenditineraryinformationService {

  model = new Itineraryinformation();
  saveInformation(name, address, guests, rooms, checkindate, checkoutdate, tbt, rewards, tax, total, Email){
    this.model.hotelname = name;
    this.model.address = address;
    this.model.numberofguests = guests;
    this.model.numberofrooms = rooms;
    this.model.checkindate = checkindate;
    this.model.checkoudate = checkoutdate;
    this.model.totalbeforetax = tbt;
    this.model.rewardsapplied = rewards;
    this.model.tax = tax;
    this.model.ordertotal = total;
    this.model.currentemail = Email;
  }

  getModel(){
    return this.model;
  }

  constructor() { }

}
