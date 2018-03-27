export class Hotel {
  name;
  city;
  location;
  price;
  image: URL;
  rating;
  ratingImg: URL;
  review_num;
  hotelID;
  description;
  roomText;
  hotelText;
  firstImage;

  constructor() {}

  public getName() {
    return this.name;
  }
  public setName(input_name) {

    this.name = input_name;
   // console.log(this.name);
  }
  public getCity() {
    return this.city;
  }
  public setCity(input_city) {
    this.city = input_city;
  }
  public getLocation()  {
    return this.location;
  }
  public setLocation(input_location) {
    this.location = input_location;
  }
  public getPrice()  {
    return this.price;
  }
  public setPrice(input_price) {
    this.price = input_price;
  }
  public getImage(): URL {
    return this.image;
  }
  public setImage(input_image) {
    this.image = input_image;
  }
  public getRating()  {
    return this.rating;
  }
  public setRating(input_rating) {
    this.rating = input_rating;
  }
  public getRatingImg(): URL  {
    return this.ratingImg;
  }
  public setRatingImg(input_ratingImg) {
    this.ratingImg = input_ratingImg;
  }
  public getReview()  {
    return this.review_num;
  }
  public setReviewNum(input_reviewNum) {
    this.review_num = input_reviewNum;
  }

  public getHotelID() {
    return this.hotelID;
  }

  public setHotelID(id) {
    this.hotelID = id;
  }

  public setDescription(hotelDescription){
    this.description = hotelDescription;
  }

  public getDescription(){
    return this.description;
  }

  public setHotelText(htext) {
    this.hotelText = htext;  
  }

  public setRoomText(rText) {
    this.roomText = rText;
  }

  public getRoomText() {
    return this.roomText;
  }

  public getHotelText() {
    return this.hotelText;
  }

  public setFirstImage(image) {
    this.firstImage = image;
  }
}
