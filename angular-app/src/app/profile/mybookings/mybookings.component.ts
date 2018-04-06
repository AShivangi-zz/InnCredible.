import { Component, OnInit} from '@angular/core';
import { UserProfileService } from '../../services/profile.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-mybookings',
  templateUrl: './mybookings.component.html',
  styleUrls: ['./mybookings.component.scss']
})

export class MybookingsComponent implements OnInit {
  constructor(public userProfileService: UserProfileService) { }

  ngOnInit() {}

}
