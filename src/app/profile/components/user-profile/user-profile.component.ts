import { Component, Input, OnInit } from '@angular/core';
import { getUserDataMock } from '../../../../data/userDetails';
import { ClientDetails } from '../../model/profile-interface';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  @Input()
  public profile: ClientDetails;

  constructor() {
    this.profile = getUserDataMock();
  }

  ngOnInit(): void {}
}
