import { Component, OnInit } from '@angular/core';
import { UserProfileService } from '../../services/profile.service';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  constructor(public userProfileService: UserProfileService) { }

  ngOnInit() {
  }

  

}
