import { Component, Input } from '@angular/core';
import { ClientPhysicalDetails } from '@/app/profile/model/clientProfile.model';

@Component({
  selector: 'user-profile-details-container',
  templateUrl: './user-profile-details-container.component.html',
  styleUrls: ['./user-profile-details-container.component.scss'],
})
export class UserProfileDetailsContainerComponent {
  @Input()
  currentPhysicalDetails: ClientPhysicalDetails;

  constructor() {}
}
