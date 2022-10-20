import { Component, OnDestroy, OnInit } from '@angular/core';
import { TrainerProfile } from '@/app/profile/model/trainerProfile.model';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import { ActivatedRoute } from '@angular/router';
import { getGyms, getUsers } from '@/app/store/shared/shared.selector';

@Component({
  selector: 'gym',
  templateUrl: './gym.component.html',
  styleUrls: ['./gym.component.scss'],
})
export class GymComponent implements OnInit, OnDestroy {
  gymProfile: TrainerProfile;
  userProfileSub: Subscription;
  gymProfileSub: Subscription;
  username: string;
  userId: string;

  constructor(private store: Store<AppState>, private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.username = this.route.snapshot.paramMap.get('username');
    this.userProfileSub = this.store.select(getUsers).subscribe((users) => {
      this.findUserId(users);
    });

    this.gymProfileSub = this.store.select(getGyms).subscribe((gyms) => {
      this.findGyms(gyms);
    });
  }

  ngOnDestroy() {
    if (this.userProfileSub) {
      this.userProfileSub.unsubscribe();
    } else if (this.gymProfileSub) {
      this.gymProfileSub.unsubscribe();
    }
  }

  findUserId(users) {
    users.map((user) =>
      user.username === this.username ? (this.userId = user.id) : ''
    );
  }

  findGyms(gyms) {
    gyms.map((gym) => {
      gym.id === this.userId ? (this.gymProfile = gym) : null;
    });
  }
}
