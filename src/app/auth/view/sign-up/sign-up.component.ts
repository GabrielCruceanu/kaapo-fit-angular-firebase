import { Component, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { AuthType } from '../../model/AuthResponseData.model';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { setLoadingSpinner } from '../../../store/shared/shared.actions';
import { signupStart } from '../../store/auth.actions';
import { Observable, Subscription } from 'rxjs';
import {
  getErrorMessage,
  getLoading,
} from '../../../store/shared/shared.selector';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
})
export class SignUpComponent implements OnInit {
  authType = AuthType;
  passwordDontMatch: boolean;
  getLoadingSpinnerSub: Subscription | undefined;
  errorMessage$: Observable<any> | undefined;

  signUpFormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
    confirmPassword: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ]),
  });

  constructor(@Optional() private auth: Auth, private store: Store<AppState>) {
    this.passwordDontMatch = true;
  }

  ngOnInit() {
    this.getLoadingSpinnerSub = this.store
      .select(getLoading)
      .subscribe((isLoading) => {
        if (isLoading) {
          this.signUpFormGroup.disable();
        } else {
          this.signUpFormGroup.enable();
        }
      });

    this.errorMessage$ = this.store.select(getErrorMessage);
  }

  checkPasswordMatch(pass?: string, confirmPass?: string) {
    if (pass && confirmPass) {
      pass === confirmPass
        ? (this.passwordDontMatch = true)
        : (this.passwordDontMatch = false);
    } else {
      this.passwordDontMatch = true;
    }
  }

  onSubmit(form: FormGroup) {
    const { email, password } = form.value;
    this.store.dispatch(setLoadingSpinner({ status: true }));
    this.store.dispatch(signupStart({ email, password }));
  }
}
