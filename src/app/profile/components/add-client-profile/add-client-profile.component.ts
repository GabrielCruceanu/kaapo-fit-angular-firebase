import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthType } from '../../../auth/model/AuthResponseData.model';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import {
  setErrorMessage,
  setLoadingSpinner,
} from '../../../store/shared/shared.actions';
import {
  getErrorMessage,
  getLoading,
} from '../../../store/shared/shared.selector';
import { loginStart } from '../../../auth/store/auth.actions';

@Component({
  selector: 'app-add-client-profile',
  templateUrl: './add-client-profile.component.html',
  styleUrls: ['./add-client-profile.component.scss'],
})
export class AddClientProfileComponent implements OnInit, OnDestroy {
  authType = AuthType;
  getLoadingSpinnerSub: Subscription | undefined;
  errorMessage$: Observable<any> | undefined;

  userFormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    age: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
  });

  constructor(private store: Store<AppState>) {
    this.store.dispatch(setErrorMessage({ message: '' }));
  }

  ngOnInit(): void {
    this.getLoadingSpinnerSub = this.store
      .select(getLoading)
      .subscribe((isLoading: boolean) => {
        if (isLoading) {
          this.userFormGroup.disable();
        } else {
          this.userFormGroup.enable();
        }
      });

    this.errorMessage$ = this.store.select(getErrorMessage);
  }

  onSubmit() {
    if (this.userFormGroup.valid) {
      const { email, password } = this.userFormGroup.value;
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
