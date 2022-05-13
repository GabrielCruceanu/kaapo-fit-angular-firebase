import { Component, Input, OnInit } from '@angular/core';
import { ClientDetails } from '../../../profile/model/profile-interface';

@Component({
  selector: 'app-header-profile',
  templateUrl: './header-profile.component.html',
  styleUrls: ['./header-profile.component.scss'],
})
export class HeaderProfileComponent implements OnInit {
  @Input()
  userDetails: ClientDetails | undefined;
  @Input()
  end: boolean | undefined;
  constructor() {}

  ngOnInit(): void {}
}
