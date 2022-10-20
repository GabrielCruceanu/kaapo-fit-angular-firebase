import { Component, OnDestroy, OnInit } from '@angular/core';
import { NutritionistProfile } from '@/app/profile/model/nutritionistProfile.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import { ActivatedRoute } from '@angular/router';
import { getNutritionists, getUsers } from '@/app/store/shared/shared.selector';

@Component({
  selector: 'app-nutrition',
  templateUrl: './nutrition.component.html',
  styleUrls: ['./nutrition.component.scss'],
})
export class NutritionComponent implements OnInit, OnDestroy {
  nutritionistProfile: NutritionistProfile;
  nutritionistProfileSub: Subscription;
  userProfileSub: Subscription;
  username: string;
  userId: string;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit() {
    this.username = this.route.snapshot.paramMap.get('username');
    this.userProfileSub = this.store.select(getUsers).subscribe((users) => {
      this.findUserId(users);
    });

    this.nutritionistProfileSub = this.store
      .select(getNutritionists)
      .subscribe((nutritionists) => {
        this.findNutritionist(nutritionists);
      });
  }

  ngOnDestroy() {
    if (this.userProfileSub) {
      this.userProfileSub.unsubscribe();
    } else if (this.nutritionistProfileSub) {
      this.nutritionistProfileSub.unsubscribe();
    }
  }

  findUserId(users) {
    users.map((user) =>
      user.username === this.username ? (this.userId = user.id) : ''
    );
  }

  findNutritionist(nutritionists) {
    nutritionists.map((nutritionist) => {
      nutritionist.id === this.userId
        ? (this.nutritionistProfile = nutritionist)
        : null;
    });
  }
}
