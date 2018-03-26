export class Hotel {
  private name: string;
  private city: string;
  private location: string;
  private price: string;
  private image: URL;
  private rating: string;
  private ratingImg: URL;
  private review_num: string;
  private hotelID: string;
  constructor() {}

  public getName(): string {
    return this.name;
  }
  public setName(input_name: string) {

    this.name = input_name;
   // console.log(this.name);
  }
  public getCity(): string {
    return this.city;
  }
  public setCity(input_city: string) {
    this.city = input_city;
  }
  public getLocation(): string  {
    return this.location;
  }
  public setLocation(input_location: string) {
    this.location = input_location;
  }
  public getPrice(): string  {
    return this.price;
  }
  public setPrice(input_price: string) {
    this.price = input_price;
  }
  public getImage(): URL {
    return this.image;
  }
  public setImage(input_image: URL) {
    this.image = input_image;
  }
  public getRating(): string  {
    return this.rating;
  }
  public setRating(input_rating: string) {
    this.rating = input_rating;
  }
  public getRatingImg(): URL  {
    return this.ratingImg;
  }
  public setRatingImg(input_ratingImg: URL) {
    this.ratingImg = input_ratingImg;
  }
  public getReview(): string  {
    return this.review_num;
  }
  public setReviewNum(input_reviewNum: string) {
    this.review_num = input_reviewNum;
  }

  public getHotelID(): string {
    return this.hotelID;
  }

  public setHotelID(id: string) {
    this.hotelID = id;
  }
}
