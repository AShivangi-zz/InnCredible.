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

    private amenities: string[] = [];
    private images: URL[] = [];
    private _amenitiesList: BehaviorSubject<string[]> = new BehaviorSubject([]);
    private _imagesList: BehaviorSubject<URL[]> = new BehaviorSubject([]);

    constructor() {}

    public getHotelData(id: string) {
      this.HotelId = id;
      const ref = firebase.database().ref('/hotels/' + this.HotelId);
      ref.once('value')
          .then((snapshot) => {// ** My only change ** or use snapshot
          this.setHotelName(snapshot.child('name').val());
          this.setPrice(snapshot.child('price').val());
          this.setLocation(snapshot.child('location/all').val());
          this.setDescription(snapshot.child('attr/description').val());
          this.setRating(snapshot.child('rating/rating').val());
          this.setRatingImage(snapshot.child('rating/rating-img').val());
          this.setReview(snapshot.child('rating/reviews').val());
      });
      this.retrieveAmenities();
      this.retrieveImages();
    }

    public setHotelName(name:string){
      this.HotelName = name;
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

    private retrieveAmenities(): void {
      const amenities_ref =  firebase.database().ref('/hotels/' + this.HotelId+"/amenities/");

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

    private retrieveImages(): void {
      const images_ref =  firebase.database().ref('/hotels/' + this.HotelId+"/images/");

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
}
