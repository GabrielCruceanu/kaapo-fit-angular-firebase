import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Store } from '@ngrx/store';
import { map, Observable, take } from 'rxjs';
import * as fromAuth from '../reducers';
import { AuthActions } from '../actions';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private store: Store) {}

  canActivate(): Observable<boolean> {
    return this.store.select(fromAuth.selectUser).pipe(
      map((user) => {
        console.log('authed', user)
        if (!user) {
          this.store.dispatch(AuthActions.loginRedirect());
          return false;
        }
        return true;
      })
    );
  }
}
