import { Injectable } from '@angular/core';
import {Itineraryinformation} from "../itineraryinformation";

@Injectable()
export class SenditineraryinformationService {

  model = new Itineraryinformation();
  saveInformation(name, address, guests, rooms, checkindate: Date, checkoutdate:Date, tbt, rewards, tax, total, Email){
    this.model.hotelname = name;
    this.model.address = address;
    this.model.numberofguests = guests;
    this.model.numberofrooms = rooms;
    this.model.checkindate = checkindate.toDateString();
    this.model.checkoudate = checkoutdate.toDateString();
    this.model.totalbeforetax = tbt;
    this.model.rewardsapplied = rewards;
    this.model.tax = tax.toFixed(2);
    this.model.ordertotal = total.toFixed(2);
    this.model.currentemail = Email;
  }

  getModel(){
    return this.model;
  }

  constructor() { }

}
