import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { map, Observable } from 'rxjs';
import { AppState } from '@/app/store/app.state';
import { Store } from '@ngrx/store';
import { isAuthenticated } from '@/app/features/auth/store/auth.selector';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private store: Store<AppState>, private router: Router) {}
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree>
    | boolean
    | UrlTree {
    this.store.select(isAuthenticated).pipe(
      map((authenticate) => {
        if (authenticate) {
          return this.router.createUrlTree(['/acasa']);
        }
      })
    );
    return true;
  }
}
