import { Component, Input, OnInit } from '@angular/core';
import { getUserDataMock, UserMock } from '../../../../data/user.mock';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @Input()
  public profile: UserMock;

  constructor() {
    this.profile = getUserDataMock();
  }

  ngOnInit(): void {}
}
