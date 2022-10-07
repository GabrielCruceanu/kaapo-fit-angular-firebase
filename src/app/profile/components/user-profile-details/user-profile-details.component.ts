import { Component, Input } from '@angular/core';
import { ClientPhysicalDetails } from '../../model/clientProfile.model';

@Component({
  selector: 'app-user-profile-details',
  templateUrl: './user-profile-details.component.html',
  styleUrls: ['./user-profile-details.component.scss'],
})
export class UserProfileDetailsComponent {
  @Input()
  physicalDetails: ClientPhysicalDetails | null;
}
