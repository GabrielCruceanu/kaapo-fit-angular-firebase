import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '@/app/profile/model/review.model';
import { getNutritionistProfile } from '@/app/profile/store/profile.selector';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import { NutritionistProfile } from '@/app/profile/model/nutritionistProfile.model';

@Component({
  selector: 'nutritionist-profile',
  templateUrl: './nutritionist-profile.component.html',
  styleUrls: ['./nutritionist-profile.component.scss'],
})
export class NutritionistProfileComponent implements OnInit {
  nutritionistProfileDetails$: Observable<NutritionistProfile | null>;
  reviews$: Observable<Review[] | null>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.nutritionistProfileDetails$ = this.store.select(
      getNutritionistProfile
    );
  }
}
