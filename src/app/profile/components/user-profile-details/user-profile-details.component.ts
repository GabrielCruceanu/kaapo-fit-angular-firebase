import { Component, OnInit } from '@angular/core';
import { getUserDataMock } from '../../../../data/userDetails';
import { ClientDetails } from '../../model/profile-interface';

@Component({
  selector: 'app-user-profile-details',
  templateUrl: './user-profile-details.component.html',
  styleUrls: ['./user-profile-details.component.scss'],
})
export class UserProfileDetailsComponent implements OnInit {
  public profile: ClientDetails;
  constructor() {
    this.profile = getUserDataMock();
  }

  ngOnInit(): void {}
}
