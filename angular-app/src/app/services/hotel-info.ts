/*
//export class result{
  amenities: string;
  location: string;
  price: string;


export class reviews{
  name:string;
  rating: string;
  picture: url;
  date: string;
  text: string;
}
}
*/

import { Injectable } from "@angular/core";
import * as firebase from 'firebase';

@Injectable()

export class HotelInfo {

  //  private authInfo;
   private HotelId = "0";
    private HotelName: string;
    private amenities : any;
    private location: string;
    private price: string;
    private reviews: any;
    private rating: string;
    private ratingImage: string;
    private description:string;
    private facility = new Array();



    constructor() {
      //  this.uid = firebase.auth().currentUser.uid;
      this.hotelName();
      this.Price();
      this.Location();
      this.Review();
      this.Rating();
      this.RatingImage();
      this.Description();
      this.AmenitiesRoom();
    }
/*
public setHotelId(number : string){
  this.HotelId = number;
} */
    public hotelName(){
      var name: string;
      firebase.database().ref('/hotels/' + this.HotelId).once('value')
          .then((snapshot) => {// ** My only change ** or use snapshot
          this.setHotelName(snapshot.child('name').val());
      });
    }

    public setHotelName(name:string){
      this.HotelName = name;
    }

    public getHotelName(): string {
       return this.HotelName;
    }

    public Price(){
      var HotelPrice: string;
      firebase.database().ref('/hotels/' + this.HotelId).once('value')
          .then((snapshot) => {// ** My only change ** or use snapshot
              this.setPrice(snapshot.child('price').val());
      });
    }

    public setPrice(HotelPrice:string) {
      this.price = HotelPrice;
    }

    public getPrice(): string {
      return this.price;
    }


    public Location(){
      var HotelLoaction: string;
      firebase.database().ref('/hotels/' + this.HotelId+ '/location').once('value')
          .then((snapshot) => {// ** My only change ** or use snapshot
            this.setLocation(snapshot.child('all').val());
      });
    }

    public setLocation(HotelLocation:string){
       this.location = HotelLocation;
    }

    public getLocation():string{
         return this.location;
    }


    public Review(){
      var review: string;
      firebase.database().ref('/hotels/' + this.HotelId+ '/rating').once('value')
          .then((snapshot) => {// ** My only change ** or use snapshot
              this.setReview(snapshot.child('reviews').val());
      });
    }

    public setReview(review:string) {
      this.reviews = review;
    }
    public getReview(){
       return this.reviews;
    }

    public Rating(){
      var rating: string;
      firebase.database().ref('/hotels/' + this.HotelId+ '/rating').once('value')
          .then((snapshot) => {// ** My only change ** or use snapshot
              this.setRating(snapshot.child('rating').val());
      });
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

    private AmenitesHotel(): any{
         var countHotel = firebase.database().ref('/hotels/' + this.HotelId+ '/amenities/hotel').getChildren().length;

         for(var i= 0; i<countHotel; i++){
          var numHotel = i.toString();
         firebase.database().ref('/hotels/' + this.HotelId+ '/amenities/hotel/').once('value')
             .then((snapshot) => {// ** My only change ** or use snapshot
                 this.facility.setAmenities(snapshot.child('numHotel').val());
         });
       }
     }
/*
     private AmenitesRoom(): any{
          var countRoom = firebase.database().ref('/hotels/' + this.HotelId+ '/amenities/room').getChildren().length;

          for(var i= 0; i<countRoom; i++){
           var numRoom = i.toString();
          firebase.database().ref('/hotels/' + this.HotelId+ '/amenities/room/').once('value')
              .then((snapshot) => {// ** My only change ** or use snapshot
                  this.facility.setAmenities(snapshot.child('numRoom').val());
          });
        }
      }

       public setAmenities(Amenity:string){
      //   var facility = new Array();
         this.facility.push(Amenity);

       }

     public getAmenities(){
       return facility;
     }
*/


     public Description(){
       var hotelDescription: string;
       firebase.database().ref('/hotels/' +this.HotelId+ '/attr').once('value')
           .then((snapshot) => {// ** My only change ** or use snapshot
            this.setDescription(snapshot.child('description').val());
       });
     }
     public setDescription(hotelDescription:string){
           this.description = hotelDescription;
     }
     public getDescription(){
             return this.description;
     }
}
