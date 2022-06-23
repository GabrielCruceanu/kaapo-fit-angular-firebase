import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainerProfile } from '@/app/profile/model/trainerProfile.model';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import {
  getClientProfile,
  getReviewsProfile,
  getTrainerProfile,
} from '@/app/profile/store/profile.selector';
import { ProfileService } from '@/app/profile/services/profile.service';
import { Review } from '@/app/profile/model/review.model';

@Component({
  selector: 'trainer-profile',
  templateUrl: './trainer-profile.component.html',
  styleUrls: ['./trainer-profile.component.scss'],
})
export class TrainerProfileComponent implements OnInit {
  trainerProfileDetails$: Observable<TrainerProfile | null>;
  reviews$: Observable<Review[] | null>;

  sampleUserProfileImage = '../../../../assets/images/user.jpg';

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.trainerProfileDetails$ = this.store.select(getTrainerProfile);
    this.reviews$ = this.store.select(getReviewsProfile);

    // this.profileService.getReviews().subscribe((reviews) => {
    //   const id = 'OtUCGAquyeffo7guO82kGI61dSn1';
    //   console.log('reviews', reviews);
    // });
    // this.profileService.getReviews('OtUCGAquyeffo7guO82kGI61dSn1');
  }
}
