export class Hotel {
  public name: string;
  public city: string;
  public location: string;
  public price: string;
  public image: URL;
  public rating: string;
  public ratingImg: URL;
  public review_num: string;
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
}
