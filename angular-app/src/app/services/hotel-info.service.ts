import { Injectable } from "@angular/core";
import * as firebase from 'firebase';

@Injectable()

export class result 
{
  amenities: string;
  location: string;
  price: string;

  constructor() {
       
	

    }

	public getAmenities() {
        return this.amenities;
    }
}
