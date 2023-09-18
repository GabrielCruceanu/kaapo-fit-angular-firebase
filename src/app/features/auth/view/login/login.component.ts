import { Component, OnDestroy, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { Store } from '@ngrx/store';
import { Observable, Subscription } from 'rxjs';
import { AppState } from '@/app/store/app.state';
import { loginStart } from '../../store/auth.actions';
import { AuthType } from '../../model/AuthResponseData.model';
import {
  setErrorMessage,
  setLoadingSpinner,
} from '@/app/store/shared/shared.actions';
import {
  getErrorMessage,
  getLoading,
} from '@/app/store/shared/shared.selector';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  authType = AuthType;
  getLoadingSpinnerSub: Subscription | undefined;
  errorMessage$: Observable<any> | undefined;

  loginFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(@Optional() private auth: Auth, private store: Store<AppState>) {
    this.store.dispatch(setErrorMessage({ message: '' }));
  }

  ngOnInit() {
    this.getLoadingSpinnerSub = this.store
      .select(getLoading)
      .subscribe((isLoading: boolean) => {
        if (isLoading) {
          this.loginFormGroup.disable();
        } else {
          this.loginFormGroup.enable();
        }
      });

    this.errorMessage$ = this.store.select(getErrorMessage);
  }

  onSubmit() {
    if (this.loginFormGroup.valid) {
      const { email, password } = this.loginFormGroup.value;
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(loginStart({ email, password }));
    }
  }

  ngOnDestroy() {
    if (this.getLoadingSpinnerSub) {
      this.getLoadingSpinnerSub.unsubscribe();
    }
  }
}
