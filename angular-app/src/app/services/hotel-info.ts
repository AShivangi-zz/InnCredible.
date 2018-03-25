import { Injectable } from "@angular/core";
import * as firebase from 'firebase';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';

@Injectable()

export class HotelInfo {

  private HotelId: string;
  private HotelName: string;
  private location: string;
  private price: string;
  private reviews: any;
  private rating: string;
  private ratingImage: string;
  private description:string;
  private roomText:string;
  private hotelText:string;
  private hasImg = 0;

  private amenities: string[] = [];
  private images: URL[] = [];
  private _amenitiesList: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private _imagesList: BehaviorSubject<URL[]> = new BehaviorSubject([]);
  private _hotelName =  new BehaviorSubject<string>('');
  private _hotelLocation = new BehaviorSubject<string>('');

  public subscribeName = this._hotelName.asObservable();
  public subscribeLocation = this._hotelLocation.asObservable();

  constructor() {}

  public getHotelData(index: string) {
    const ref = firebase.database().ref('/hotels/' + index);
    ref.once('value')
      .then((snapshot) => {// ** My only change ** or use snapshot
        this.setHotelID(snapshot.child('id').val());
        this.setHotelName(snapshot.child('name').val());
        this.setPrice(snapshot.child('price').val());
        this.setLocation(snapshot.child('location/all').val());
        this.setDescription(snapshot.child('attr/description').val());
        this.setRating(snapshot.child('rating/rating').val());
        this.setRatingImage(snapshot.child('rating/rating-img').val());
        this.setReview(snapshot.child('rating/reviews').val());
      });
      this.retrieveAmenities(index);

      this._hotelName.next(this.HotelName);
      this._hotelLocation.next(this.location);
  }

  public setHotelID(id: string) {
    this.HotelId = id;
  }

  public getHotelID(): string {
    return this.HotelId;
  }

  public setHotelName(name:string){
    this.HotelName = name;
    this._hotelName.next(this.HotelName);
  }

  public getHotelName(): string {
    return this.HotelName;
  }

  public setPrice(HotelPrice:string) {
    this.price = HotelPrice;
  }

  public getPrice(): string {
    return this.price;
  }

  public setLocation(HotelLocation:string){
    this.location = HotelLocation;
    this._hotelLocation.next(this.location);
  }

  public getLocation():string{
    return this.location;
  }

  public setDescription(hotelDescription:string){
    this.description = hotelDescription;
  }

  public getDescription(){
    return this.description;
  }

  public setReview(review:string) {
    this.reviews = review;
  }
  public getReview(){
    return this.reviews;
  }

  public setRating(rating:string){
    this.rating = rating;
  }
  public getRating(){
    return this.rating;
  }

  public RatingImage(){
    var ratingImages: string;
    firebase.database().ref('/hotels/' + this.HotelId+ '/rating').once('value')
      .then((snapshot) => {// ** My only change ** or use snapshot
        this.setRatingImage(snapshot.child('rating-img').val());
      });
  }

  public setRatingImage(ratingImages:string){
    this.ratingImage = ratingImages;
  }

  public getRatingImage(){
    return this.ratingImage;
  }

  private retrieveAmenities(id:string): void {
    console.log(id);
    const amenities_ref =  firebase.database().ref('/hotels/' + id +"/amenities/");

    amenities_ref.child('room/').once('value')
      .then((snapshot) => {
        const countRoom = snapshot.numChildren();
        for(var i = 0; i < countRoom; i++) {
          var number = i.toString();
          this.setAmenities(snapshot.child(number).val());
        }
      });

    amenities_ref.child('hotel/').once('value')
      .then((snapshot) => {
        const countHotel = snapshot.numChildren();
        for(var i = 0; i < countHotel; i++) {
          var number = i.toString();
          this.setAmenities(snapshot.child(number).val());
        }
      });

    amenities_ref.once('value')
      .then((snapshot) => {
        this.setTexts(snapshot.child('room-text').val(),snapshot.child('hotel-text').val());
      });
  }

  public setAmenities(HotelAmenity:string){
    this.amenities.push(HotelAmenity);
    this._amenitiesList.next(this.amenities);
  }

  public getAmenities(): Observable<string[]>{
    return this._amenitiesList.asObservable();
  }

  private setTexts(rtext: string, htext:string) {
      this.roomText = rtext;
      this.hotelText = htext;
  }

    public getRoomText() {
      return this.roomText;
  }

    public getHotelText() {
      return this.hotelText;
  }

  public retrieveImages() {
    const images_ref =  firebase.database().ref('/hotels/' + this.HotelId+"/images/");
    var count = 0;
    images_ref.once('value')
      .then((snapshot) => {
        const countImage = snapshot.numChildren();
        for(var i = 0; i < countImage; i++) {
          var number = i.toString();
          this.setImages(snapshot.child(number).val());

        }

      });
  }

  public setImages(image:URL){
    console.log(image);
    this.images.push(image);
    this._imagesList.next(this.images);
  }

  public getImages():Observable<URL[]>{
    return this._imagesList.asObservable();
  }

  public getImagesFirst() : Observable<URL> {
    return this._imagesList[0].asObservable;
  }

  public getImagesRest() : Observable<URL[]>{
    var rest: URL[] = [];
    var restList : BehaviorSubject<URL[]> = new BehaviorSubject([]);
    for(var i = 1; i < this.images.length; i++) {
      rest.push(this.images[1]);
      restList.next(rest);
    }
    return restList.asObservable();
  }

  public setHasImg() {
    this.hasImg++;
  }
  public getHasImgs() {
    console.log(this.hasImg);
    return this.hasImg;
  }
}


