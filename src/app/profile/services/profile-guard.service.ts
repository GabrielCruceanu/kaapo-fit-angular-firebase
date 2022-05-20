import { Injectable, OnDestroy, OnInit } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { UserProfile } from '../model/userProfile.model';
import { getUserProfile } from '../store/profile.selector';

@Injectable({
  providedIn: 'root',
})
export class ProfileGuard implements CanActivate, OnDestroy {
  userProfileSub: Subscription | undefined;

  constructor(private store: Store<AppState>, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    this.userProfileSub = this.store
      .select(getUserProfile)
      .subscribe((userProfile) => {
        if (!userProfile?.hasProfile) {
          this.router.createUrlTree(['/profile/add']);
        }
      });
    return true;
  }

  ngOnDestroy() {
    if (this.userProfileSub) {
      this.userProfileSub.unsubscribe();
    }
  }
}
