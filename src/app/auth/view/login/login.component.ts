import { Component, Input, OnDestroy, OnInit, Optional } from '@angular/core';
import { AuthType } from '../../../model/auth-interface';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import * as fromAuth from '../../reducers';
import { LoginPageActions } from '../../actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  authType = AuthType;
  getLoginPagePendingSub: Subscription | undefined;
  loginFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(
    @Optional() private auth: Auth,
    private store: Store<fromAuth.State>
  ) {}

  ngOnInit() {
    this.getLoginPagePendingSub = this.store
      .select(fromAuth.getLoginPagePending)
      .subscribe((isPending: boolean) => {
        console.log('isPending', isPending);
        if (isPending) {
          this.loginFormGroup.disable();
        } else {
          this.loginFormGroup.enable();
        }
      });
  }

  onSubmit() {
    if (this.loginFormGroup.valid) {
      console.log('this.loginFormGroup.valid', this.loginFormGroup.valid);
      console.log('this.loginFormGroup.value', this.loginFormGroup.value);
      this.store.dispatch(
        LoginPageActions.login({ credentials: this.loginFormGroup.value })
      );
    }
  }

  ngOnDestroy() {
    if (this.getLoginPagePendingSub) {
      this.getLoginPagePendingSub.unsubscribe();
    }
  }
}
