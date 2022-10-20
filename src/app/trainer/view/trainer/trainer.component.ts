import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import { ActivatedRoute } from '@angular/router';
import { getTrainers, getUsers } from '@/app/store/shared/shared.selector';
import { TrainerProfile } from '@/app/profile/model/trainerProfile.model';

@Component({
  selector: 'trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.scss'],
})
export class TrainerComponent implements OnInit, OnDestroy {
  trainerProfile: TrainerProfile;
  userProfileSub: Subscription;
  trainerProfileSub: Subscription;
  username: string;
  userId: string;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
    this.userProfileSub = this.store.select(getUsers).subscribe((users) => {
      this.findUserId(users);
    });

    this.trainerProfileSub = this.store
      .select(getTrainers)
      .subscribe((trainers) => {
        this.findTrainer(trainers);
      });
  }

  ngOnDestroy() {
    if (this.userProfileSub) {
      this.userProfileSub.unsubscribe();
    } else if (this.trainerProfileSub) {
      this.trainerProfileSub.unsubscribe();
    }
  }

  findUserId(users) {
    users.map((user) =>
      user.username === this.username ? (this.userId = user.id) : ''
    );
  }

  findTrainer(trainers) {
    trainers.map((trainer) => {
      trainer.id === this.userId ? (this.trainerProfile = trainer) : null;
    });
  }
}
