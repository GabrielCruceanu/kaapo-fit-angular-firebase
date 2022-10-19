import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { UserProfile } from '@/app/profile/model/userProfile.model';
import { NutritionistProfile } from '@/app/profile/model/nutritionistProfile.model';
import { getNutritionists, getUsers } from '@/app/store/shared/shared.selector';

@Component({
  selector: 'nutritions',
  templateUrl: './nutritions.component.html',
  styleUrls: ['./nutritions.component.scss'],
})
export class NutritionsComponent implements OnInit {
  nutritions$: Observable<NutritionistProfile[] | []>;
  users$: Observable<UserProfile[] | []>;
  constructor(private store: Store) {}

  ngOnInit(): void {
    this.nutritions$ = this.store.select(getNutritionists);
    this.users$ = this.store.select(getUsers);
  }
}
