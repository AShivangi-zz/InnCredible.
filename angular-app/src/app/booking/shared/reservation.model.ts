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
 /*
    Date Difference function retrieved from:
    https://www.htmlgoodies.com/html5/javascript/calculating-the-difference-between-two-dates-in-javascript.html
  
  nights(): number {
    if (   this.checkInDt   === null
        || this.checkOutDt  === null
    ) {
      return null;
    }
      // Get 1 day in milliseconds
      const one_day = 1000 * 60 * 60 * 24;

      // Convert both dates to milliseconds
      const date1_ms = new Date(this.checkInDt).getTime();
      const date2_ms = new Date(this.checkOutDt).getTime();

      // Calculate the difference in milliseconds
      const difference_ms = date2_ms - date1_ms;

      // Convert back to days and return
      return Math.round(difference_ms / one_day);
  };*/

}
