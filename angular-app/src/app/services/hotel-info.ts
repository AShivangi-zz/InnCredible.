import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import { Hotel } from '../hotel';

@Injectable()

export class HotelInfo {

  private bookHotel = new Hotel();
  private reviews: any;
  private ratingImage: string;
  private description: string;
  private roomText: string;
  private hotelText: string;
  private hasImg = 0;

  private amenities: string[] = [];
  private images: URL[] = [];
  private _amenitiesList: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private _imagesList: BehaviorSubject<URL[]> = new BehaviorSubject([]);

  private _thisHotel = new BehaviorSubject<Hotel>(null);
  public activeHotel = this._thisHotel.asObservable();

  constructor() {}

  public getHotelData(index: string) {
    const ref = firebase.database().ref('/hotels/' + index);
    ref.once('value')
      .then((snapshot) => {// ** My only change ** or use snapshot
        this.bookHotel.setIndex(index);
        this.setHotelID(snapshot.child('id').val());
        this.setHotelName(snapshot.child('name').val());
        this.setPrice(snapshot.child('price').val());
        this.setLocation(snapshot.child('location/all').val());
        this.setRating(snapshot.child('rating/rating').val());
        this.setDescription(snapshot.child('attr/description').val());
        this.setRatingImage(snapshot.child('rating/rating-img').val());
        this.setReview(snapshot.child('rating/reviews').val());
      });

      this.retrieveAmenities(index);
      this._thisHotel.next(this.bookHotel);
  }

  public setHotelID(id: string) {
    this.bookHotel.setHotelID(id);
  }

  public getHotelID(): string {
    return this.bookHotel.getHotelID();
  }

  public setHotelName(name:string){
    this.bookHotel.setName(name);
  }

  public getHotelName(): string {
    return this.bookHotel.getName();
  }

  public setPrice(HotelPrice:string) {
    this.bookHotel.setPrice(HotelPrice);
  }

  public getPrice(): string {
    return this.bookHotel.getPrice();
  }

  public setLocation(HotelLocation:string){
    this.bookHotel.setLocation(HotelLocation);
  }

  public getLocation():string{
    return this.bookHotel.getLocation();
  }

  public setRating(rating:string) {
    this.bookHotel.setRating(rating);
  }
  public getRating() {
    return this.bookHotel.getRating();
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

  public RatingImage(){
    var ratingImages: string;
    firebase.database().ref('/hotels/' + this.getHotelID() + '/rating').once('value')
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
    const amenities_ref =  firebase.database().ref('/hotels/' + id + '/amenities/');

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
        this.setTexts(snapshot.child('room-text').val(), snapshot.child('hotel-text').val());
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
    const images_ref =  firebase.database().ref('/hotels/' + this.getHotelID() + '/images/');
    var count = 0;
    images_ref.once('value')
      .then((snapshot) => {
        const countImage = snapshot.numChildren();
        for (let i = 0; i < countImage; i++) {
          const number = i.toString();
          this.setImages(snapshot.child(number).val());

        }

      });
  }

  public setImages(image: URL) {
    console.log(image);
    this.images.push(image);
    this._imagesList.next(this.images);
  }

  public getImages(): Observable<URL[]>{
    return this._imagesList.asObservable();
  }

  public getImagesFirst(): Observable<URL> {
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


