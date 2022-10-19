import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TrainerProfile } from '@/app/profile/model/trainerProfile.model';
import { Store } from '@ngrx/store';
import { getTrainers, getUsers } from '@/app/store/shared/shared.selector';
import { UserProfile } from '@/app/profile/model/userProfile.model';

@Component({
  selector: 'trainers',
  templateUrl: './trainers.component.html',
  styleUrls: ['./trainers.component.scss'],
})
export class TrainersComponent implements OnInit {
  trainers$: Observable<TrainerProfile[] | []>;
  users$: Observable<UserProfile[] | []>;

  constructor(private store: Store) {}

  ngOnInit(): void {
    this.trainers$ = this.store.select(getTrainers);
    this.users$ = this.store.select(getUsers);
  }
}
