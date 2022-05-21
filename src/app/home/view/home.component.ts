import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { autoLogout } from '../../auth/store/auth.actions';
import { getUserAuth } from '../../auth/store/auth.selector';
import { UserAuth } from '../../auth/model/userAuth.model';
import { Observable, of } from 'rxjs';
import { getUserProfileStart } from '../../profile/store/profile.actions';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  userAuth$: Observable<UserAuth | null>;

  constructor(private store: Store) {
    this.userAuth$ = of(null);
  }

  ngOnInit() {
    this.userAuth$ = this.store.select(getUserAuth);
  }

  logout(event: Event) {
    event.preventDefault();
    this.store.dispatch(autoLogout());
  }
}
