import { Component, OnInit } from '@angular/core';
import { getUserDataMock, UserMock } from '../../../../data/user.mock';

@Component({
  selector: 'app-user-profile-details',
  templateUrl: './user-profile-details.component.html',
  styleUrls: ['./user-profile-details.component.scss'],
})
export class UserProfileDetailsComponent implements OnInit {
  public profile: UserMock;
  constructor() {
    this.profile = getUserDataMock();
  }

  ngOnInit(): void {}
}
