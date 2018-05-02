import { Injectable } from '@angular/core';
import {Hotel} from '../models/hotel';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class FilterService {
  private rateFilter: number;
  private filteredHotels: Hotel[] = [];
  private _observableList = new BehaviorSubject<Hotel[]>(null);
  public  currentFilter = this._observableList.asObservable();

  constructor() {
    this.rateFilter = 1;
  }

  public loadFilter(hotels: Hotel[]) {
    this.filteredHotels = hotels;
    this._observableList.next(this.filteredHotels);
  }

  filterByRating(rating: number, fullList: Hotel[], checked: any) {
    let searchList: Hotel[] = [];

    if (rating > this.rateFilter) {
      searchList = this.filteredHotels;
    } else {
      searchList = fullList;
    }
    this.rateFilter = rating;

    const newFilter: Hotel[] = [];
    for (let i = 0; i < searchList.length; i++) {
      if (searchList[i].ratingValue >= rating
          && this.checkedFilter(searchList[i].amenities, checked)) {
        newFilter.push(searchList[i]);
      }
    }

    this.filteredHotels = newFilter;
    this._observableList.next(this.filteredHotels);

  }

  checkedFilter(amens: string[], checked: any): boolean {
    // So this hotel would have previously been filtered because of this
    // checked amenity.  But I can't really restore it until I make sure that
    // it wasn't filtered out because of some other checked amenity.

    if (checked.length === 0) { return true; }

    let bChecked = false;

    // I have to check that this hotel satisfies each checked amenity
    for (let c = 0; c < checked.length; c++) {

      // So I need to check through the hotel's entire amenities list
      for (let a = 0; a < amens.length; a++) {
        if (amens[a] != null && amens[a].toUpperCase().includes(checked[c].name.toUpperCase())) {
          bChecked = true;
        }
      }

      // If I have gone to the end of the list and nothing matched, then this hotel doesn't
      // fulfill the current filter and shouldn't be added.
      if (!bChecked) {
        break;
      }
    }
    return bChecked;
  }

  checkAmenity(amenity: any) {
    const amenFilter: Hotel[] = [];

    for (let h = 0; h < this.filteredHotels.length; h++) {
      if (this.filteredHotels[h] != null) {
        const amens = this.filteredHotels[h].amenities;
        dance:
          for (let a = 0; a < amens.length; a++) {
            if (amens[a] != null
              && amens[a].toUpperCase().includes(amenity.name.toUpperCase())) {

                amenFilter.push(this.filteredHotels[h]);
                break dance;
            }
          }
      }
    }

    this.filteredHotels = amenFilter;
    this._observableList.next(this.filteredHotels);
  }

  /* ====== uncheckAmenity ======
    The logic here is damn squirrelly...
    If a box is unchecked, I need to search the full search results list
    for the amenity that was unchecked, and if that unchecked item is
    present in a hotel, add it back to the filtered list.  But I can't
    add it back to the list until I first ensure that ALL other checked
    conditions are present.

    Parameters:
      amenity: the amenity that was just changed
      checked: array of all checked amenities
      fullSearch: array of all hotels in the current search
   */
  uncheckAmenity(amenity: any, checked: any, fullSearch: Hotel[]) {
  if ((checked === null) || checked.length === 0) {
    // This case is easy - if nothing else was checked, than the
    // original fullSearch list doesn't change (with the exception
    // of the rating filter which is reapplied at the end.
    this.filteredHotels = fullSearch;

    this.filterByRating(this.rateFilter, fullSearch, checked);
  } else {
    // OK. So we've confirmed that we need to scrutinize the existing filters.
    for (let h = 0; h < fullSearch.length; h++) {

      // Let's check the rating first because if it isn't there we avoid a lot of work
      if (fullSearch[h].ratingValue >= this.rateFilter) {
        const amens = fullSearch[h].amenities;

        let bFound = false;
        dance:
          for (let a = 0; a < amens.length; a++) {
            if (amens[a] != null
              && amens[a].toUpperCase().includes(amenity.name.toUpperCase())) {
              // I found the amenity in this hotel, identify as found and skip
              // (this hotel will already be present in the filtered list so I do
              //  nothing with it)
              bFound = true;
              break dance;
            }
          }
        if (!bFound) {
          const bChecked = this.checkedFilter(amens, checked);
          if (!bFound && bChecked) {
            this.filteredHotels.push(fullSearch[h]);
          }
        }
      }
    }
  }
    this._observableList.next(this.filteredHotels);
  }
}
