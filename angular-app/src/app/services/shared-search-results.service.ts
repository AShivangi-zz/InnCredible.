import { Injectable } from '@angular/core';
import {Search} from "../search";

@Injectable()
export class SharedSearchResultsService {

  model = new Search();
  saveInformation(name, datein, dateout) {
    this.model.cityname = name;
    this.model.checkindate = datein;
    this.model.checkoutdate = dateout;
  }

  getInformationModel() {
    return this.model;
  }

  constructor() { }

}
