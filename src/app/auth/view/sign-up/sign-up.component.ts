import { Component, OnInit, Optional } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Auth } from '@angular/fire/auth';
import { AuthType } from '../../model/AuthResponseData.model';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import {
  setErrorMessage,
  setLoadingSpinner,
} from '@/app/store/shared/shared.actions';
import { signupStart } from '../../store/auth.actions';
import { Observable, Subscription } from 'rxjs';
import {
  getErrorMessage,
  getLoading,
} from '@/app/store/shared/shared.selector';
import { AuthService } from '@/app/auth/services/auth.service';

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
  usernameIsNotValid: boolean;
  signUpFormGroup: FormGroup;

  constructor(
    @Optional() private auth: Auth,
    private store: Store<AppState>,
    private authService: AuthService
  ) {
    this.passwordDontMatch = true;
    this.store.dispatch(setErrorMessage({ message: '' }));
  }

  ngOnInit() {
    this.signUpFormGroup = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(30),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
    });

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
      pass !== confirmPass
        ? this.signUpFormGroup.controls['confirmPassword'].setErrors({
            passwordDontMatch: true,
          })
        : null;
    }
  }

  handleCheckUsername(value: string) {
    if (value.length >= 3) {
      return this.authService.onCheckUsername(value).then((r) => {
        if (r) {
          this.signUpFormGroup.controls['username'].setErrors({
            usernameIsNotValid: true,
          });
        }
      });
    }
  }

  onSubmit(form: FormGroup) {
    const { email, username, password } = form.value;
    if (form.valid) {
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(signupStart({ email, username, password }));
    }
  }
}
