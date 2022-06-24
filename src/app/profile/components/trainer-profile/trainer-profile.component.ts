import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainerProfile } from '@/app/profile/model/trainerProfile.model';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import { getTrainerProfile } from '@/app/profile/store/profile.selector';
import { Review } from '@/app/profile/model/review.model';

@Component({
  selector: 'trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.scss'],
})
export class TrainerProfileComponent implements OnInit {
  trainerProfileDetails$: Observable<TrainerProfile | null>;
  reviews$: Observable<Review[] | null>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.trainerProfileDetails$ = this.store.select(getTrainerProfile);
  }
}
