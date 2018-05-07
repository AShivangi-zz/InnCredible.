export class Reservation {
  $key: string;
  guests: number;
  rooms: number;
  checkInDt: Date;
  checkOutDt: Date;
  nights: number;
  comments:   string;
  hotelID:    string;
  totalCost:  number;

 constructor() {};
}
