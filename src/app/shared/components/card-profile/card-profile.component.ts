import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GymProfile } from '@/app/profile/model/gym.model';
import { TrainerProfile } from '@/app/profile/model/trainerProfile.model';
import { NutritionistProfile } from '@/app/profile/model/nutritionistProfile.model';
import { UserProfile } from '@/app/profile/model/userProfile.model';
import { UserType } from '@/app/profile/model/profile-interface';

@Component({
  selector: 'card-profile',
  templateUrl: './card-profile.component.html',
  styleUrls: ['./card-profile.component.scss'],
})
export class CardProfileComponent implements OnInit {
  @Input() profile: GymProfile | TrainerProfile | NutritionistProfile | any;
  @Input() users: UserProfile[];
  userName: string;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.findUserName(this.users);
  }

  runTo(id: string) {
    switch (this.profile.status) {
      case UserType.Gym:
        this.router.navigate(['sali/', id]);
        break;
      case UserType.Trainer:
        this.router.navigate(['antrenori/', id]);
        break;
      case UserType.Nutritionist:
        this.router.navigate(['nutritionisti/', id]);
        break;
    }
  }

  findUserName(users) {
    users.map((user) => {
      if (user.id === this.profile.id) {
        this.userName = user.username;
      }
    });
  }
}
