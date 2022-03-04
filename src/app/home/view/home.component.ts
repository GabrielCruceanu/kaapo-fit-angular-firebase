import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AuthActions } from '../../auth/actions';
import * as fromAuth from '../../auth/reducers'
import {User} from "@angular/fire/auth";

@Component({
  selector: 'app-home',
  templateUrl: 'home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent {
  user: User | null | undefined;
  constructor(private store: Store) {
    this.store.select(fromAuth.selectUser).subscribe((user) => this.user = user);
  }

  logout() {
    console.log('logout')
    this.store.dispatch(AuthActions.logout());
  }
}
