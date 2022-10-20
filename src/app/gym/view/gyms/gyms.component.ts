import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserProfile } from '@/app/profile/model/userProfile.model';
import { Store } from '@ngrx/store';
import { GymProfile } from '@/app/profile/model/gym.model';
import { getGyms, getUsers } from '@/app/store/shared/shared.selector';

@Component({
  selector: 'gyms',
  templateUrl: './gyms.component.html',
  styleUrls: ['./gyms.component.scss'],
})
export class GymsComponent implements OnInit {
  gyms$: Observable<GymProfile[] | []>;
  users$: Observable<UserProfile[] | []>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.gyms$ = this.store.select(getGyms);
    this.users$ = this.store.select(getUsers);
  }
}
