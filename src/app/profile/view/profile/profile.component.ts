import { Component } from '@angular/core';
import {getUserDataMock, UserDetails} from "../../../../data/user.details";

@Component({
  selector: 'app-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss'],
})
export class ProfileComponent {
  title: string = 'My Profile';
  profile: UserDetails

  constructor() {
    this.profile = getUserDataMock()
  }
}
