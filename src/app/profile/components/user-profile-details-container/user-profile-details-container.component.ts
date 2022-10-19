import { Component, Input, OnInit } from '@angular/core';
import { ClientPhysicalDetails } from '@/app/profile/model/clientProfile.model';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import { UserProfile } from '@/app/profile/model/userProfile.model';
import { getUserProfile } from '@/app/profile/store/profile.selector';
import { Observable } from 'rxjs';

@Component({
  selector: 'user-profile-details-container',
  templateUrl: './user-profile-details-container.component.html',
  styleUrls: ['./user-profile-details-container.component.scss'],
})
export class UserProfileDetailsContainerComponent implements OnInit {
  @Input()
  currentPhysicalDetails: ClientPhysicalDetails;
  @Input()
  viewId: string;
  userProfile$: Observable<UserProfile>;

  constructor(private store: Store<AppState>) {}
  ngOnInit() {
    this.userProfile$ = this.store.select(getUserProfile);
  }
}
