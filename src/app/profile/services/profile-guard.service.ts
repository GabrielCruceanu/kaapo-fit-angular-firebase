import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  Router,
  RouterStateSnapshot,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../store/app.state';
import { ProfileService } from './profile.service';

@Injectable({
  providedIn: 'root',
})
export class ProfileGuard {
  constructor(
    private store: Store<AppState>,
    private router: Router,
    private profileService: ProfileService
  ) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | boolean
    | UrlTree
    | Observable<boolean | UrlTree>
    | Promise<boolean | UrlTree> {
    return true;
    // return this.profileService.checkIfUserHasProfile()
    //   ? true
    //   : this.router.navigate(['/profil/selectare-profil']);
  }
}
