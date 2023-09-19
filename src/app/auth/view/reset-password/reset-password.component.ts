import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthType } from '../../model/AuthResponseData.model';
import { UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import {
  getErrorMessage,
  getLoading,
} from '@/app/store/shared/shared.selector';
import {
  setErrorMessage,
  setLoadingSpinner,
} from '@/app/store/shared/shared.actions';
import { resetStart } from '../../store/auth.actions';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export class ResetPasswordComponent implements OnInit, OnDestroy {
  authType = AuthType;
  getLoadingSpinnerSub: Subscription | undefined;
  errorMessage$: Observable<any> | undefined;

  resetFormGroup = new UntypedFormGroup({
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
  });

  constructor(private store: Store<AppState>) {
    this.store.dispatch(setErrorMessage({ message: '' }));
  }

  ngOnInit(): void {
    this.getLoadingSpinnerSub = this.store
      .select(getLoading)
      .subscribe((isLoading: boolean) => {
        if (isLoading) {
          this.resetFormGroup.disable();
        } else {
          this.resetFormGroup.enable();
        }
      });

    this.errorMessage$ = this.store.select(getErrorMessage);
  }

  onSubmit() {
    if (this.resetFormGroup.valid) {
      const { email } = this.resetFormGroup.value;
      this.store.dispatch(setLoadingSpinner({ status: true }));
      this.store.dispatch(resetStart({ email: email }));
    }
  }

  ngOnDestroy() {
    if (this.getLoadingSpinnerSub) {
      this.getLoadingSpinnerSub.unsubscribe();
    }
  }
}
