import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { autoLogout } from '../../auth/store/auth.actions';
import { getUser } from '../../auth/store/auth.selector';
import { User } from '../../auth/model/user.model';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  user$: Observable<User | null>;
  constructor(private store: Store) {
    this.user$ = of(null);
  }
  ngOnInit() {
    this.user$ = this.store.select(getUser);
  }

  logout(event: Event) {
    console.log('logout');
    event.preventDefault();
    this.store.dispatch(autoLogout());
  }
}
