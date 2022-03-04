import { Injectable } from '@angular/core';
import { Credentials } from '../../model/user';
import { EMPTY, Observable, of } from 'rxjs';
import {
  Auth,
  signInWithEmailAndPassword,
  User,
  signOut,
} from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  public user: Observable<User>;

  constructor(private auth: Auth, private router: Router) {
    this.user = EMPTY;
  }

  login(credentials: Credentials) {
    return signInWithEmailAndPassword(
      this.auth,
      credentials.email,
      credentials.password
    );
  }

  logOut() {
    signOut(this.auth).then(() => this.router.navigate(['/auth/login']));
  }
}
