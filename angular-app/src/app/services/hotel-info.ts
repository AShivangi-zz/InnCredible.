import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';
import {Observable} from 'rxjs/Observable';
import {Hotel} from '../models/hotel';
import { AngularFireDatabase } from 'angularfire2/database';

@Injectable()

export class HotelInfo {

  private hotelIdx: string;

  private images: URL[] = [];
  // private _amenities: string[] = [];
  // private _temp_amenities: string[] = [];
  // private _amenitiesList: BehaviorSubject<string[]> = new BehaviorSubject([]);
  private _imagesList: BehaviorSubject<URL[]> = new BehaviorSubject([]);
  private _thisHotel = new BehaviorSubject<Hotel>(null);
  public activeHotel = this._thisHotel.asObservable();
  public imgDone  = false;

  hotel: Hotel;

  constructor() {
  }

  public async initHotelByID(hotelID: string) {
    await this.findHotelIdx(hotelID);
    await this.initHotelByIdx(this.hotelIdx);
    await this.retrieveImages(this.hotelIdx);
  }

  public async initHotelByIdx(idx: string) {
    await this.getHotelData(idx);
    await this.retrieveAmenities(idx);

    this._thisHotel.next(this.hotel);
  }

  private async findHotelIdx(hotelID: string) {
    const id_ref = firebase.database().ref('/hotel_id');
    return id_ref.once('value')
      .then((snapshot) => {
        for (let h = 0; h < snapshot.numChildren(); h++) {
          if (snapshot.child(h).val() === hotelID) {
            this.hotelIdx = h.toString();
          }
        }
      });
  }

  public async getHotelData(index: string) {
    this.hotel = new Hotel();
    const ref = firebase.database().ref('/hotels/' + index);

    const promise = ref.once('value')
      .then((snapshot) => {// ** My only change ** or use snapshot
        this.hotel.setIndex(index);
        this.hotel.setCity(snapshot.child('/location/city').val());
        this.hotel.setHotelID(snapshot.child('/id').val());
        this.hotel.setName(snapshot.child('/name').val());
        this.hotel.setPrice(snapshot.child('/price').val());
        this.hotel.setLocation(snapshot.child('/location/all').val());
        this.hotel.setRating(snapshot.child('/rating/rating').val());
        this.hotel.setDescription(snapshot.child('/attr/description').val());
        this.hotel.setRatingImg(snapshot.child('/rating/rating-img').val());
        this.hotel.setReviewNum(snapshot.child('/rating/reviews').val());
        this.hotel.setRoomText(snapshot.child('/amenities/room-text').val());
        this.hotel.setHotelText(snapshot.child('/amenities/hotel-text').val());
        this.hotel.setFirstImage(snapshot.child('/images/0').val());
        this.hotel.setCheckIn(snapshot.child('/availability/check-in').val());
        this.hotel.setCheckOut(snapshot.child('/availability/check-out').val());
      });

      return promise;
  }

  public getHotel(): Hotel {
    return this.hotel;
  }
  // public setActiveHotel(hotel: Hotel) {
  //   this.hotel = hotel;
  //   this._thisHotel.next(this.hotel);
  // }

  public async retrieveImages(id: string) {
    const images_ref = firebase.database().ref('/hotels/' + id + '/images/');
    const images: URL[] = [];

    const promise = images_ref.once('value').then((snapshot_img) => {
      const countImg = snapshot_img.numChildren();
      for (let i = 0; i < countImg; i++) {
        images.push(snapshot_img.child(i).val());
      }
      this.imgDone = true;
    });
    await promise;
    this.hotel.setImages(images);
  }

  public async retrieveAmenities(id: string) {
    const amenities_ref =  firebase.database().ref('/hotels/' + id + '/amenities/');
    const amens: String[] = [];

    let promise = amenities_ref.child('room/').once('value')
      .then((snapshot) => {
        const countRoom = snapshot.numChildren();

        for (let i = 0; i < countRoom; i++) {
          const number = i.toString();
          if (snapshot.child(number).val() !== null) {
            amens.push(snapshot.child(number).val());
          }
        }
      });
    await promise;
    promise = amenities_ref.child('hotel/').once('value')
      .then((snapshot) => {
        const countHotel = snapshot.numChildren();

        for (let i = 0; i < countHotel; i++) {
          const number = i.toString();
          if (snapshot.child(number).val() !== null) {
            amens.push(snapshot.child(number).val());
          }
        }
      });
    await promise;
    this.hotel.setAmenities(amens);
    // this.setAmenities(snapshot.child(number).val());
    // this._temp_amenities.push(snapshot.child(number).val());
    //   return this._temp_amenities;
  }

}


