import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '@/app/profile/model/review.model';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import { getGymProfile } from '@/app/profile/store/profile.selector';
import { GymProfile } from '@/app/profile/model/gym.model';

@Component({
  selector: 'gym-profile',
  templateUrl: './gym-profile.component.html',
  styleUrls: ['./gym-profile.component.scss'],
})
export class GymProfileComponent implements OnInit {
  gymProfileDetails$: Observable<GymProfile | null>;
  reviews$: Observable<Review[] | null>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.gymProfileDetails$ = this.store.select(getGymProfile);
  }
}
