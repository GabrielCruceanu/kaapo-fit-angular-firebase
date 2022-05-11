import { Component, Input, OnInit } from '@angular/core';
import { UserMock } from '../../../../data/user.mock';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss'],
})
export class HeaderProfileComponent implements OnInit {
  @Input()
  userDetails: UserMock | undefined;
  @Input()
  end: boolean | undefined;
  constructor() {}

  ngOnInit(): void {}
}
