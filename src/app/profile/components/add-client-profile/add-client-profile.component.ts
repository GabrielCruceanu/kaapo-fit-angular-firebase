import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthType } from '../../../auth/model/AuthResponseData.model';
import { Observable, Subscription } from 'rxjs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { setErrorMessage } from '../../../store/shared/shared.actions';
import {
  getErrorMessage,
  getLoading,
} from '../../../store/shared/shared.selector';
import { _filer, ProfileService } from '../../services/profile.service';
import { GooglePlaceDirective } from 'ngx-google-places-autocomplete';
import { Options } from 'ngx-google-places-autocomplete/objects/options/options';
import { UserAuth } from '../../../auth/model/userAuth.model';
import { getUserAuth } from '../../../auth/store/auth.selector';
import { CountriesData } from '../../../../data/country';

@Component({
  selector: 'app-add-client-profile',
  templateUrl: './add-client-profile.component.html',
  styleUrls: ['./add-client-profile.component.scss'],
})
export class AddClientProfileComponent implements OnInit, OnDestroy {
  // @ts-ignore
  @ViewChild('places') places: GooglePlaceDirective;
  authType = AuthType;
  userAuth: UserAuth | null | undefined;
  userAuthSub: Subscription | undefined;
  getLoadingSpinnerSub: Subscription | undefined;
  errorMessage$: Observable<any> | undefined;
  countries = CountriesData;
  options: Options = <Options>{
    fields: ['formatted_address', 'geometry', 'name'],
    types: ['(cities)'],
  };
  userAddress: string = '';
  userLatitude: string = '';
  userLongitude: string = '';

  userFormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    birth: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    country: new FormControl('', [Validators.required]),
    state: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
  });

  constructor(
    private store: Store<AppState>,
    private profileService: ProfileService
  ) {
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

    this.userAuthSub = this.store.select(getUserAuth).subscribe((userAuth) => {
      this.userAuth = userAuth;
    });

    this.errorMessage$ = this.store.select(getErrorMessage);
  }

  onSubmit() {
    console.log('this.userFormGroup', this.userFormGroup);
    if (this.userFormGroup.valid) {
      const { firstname, lastname, gender, email, phone, city } =
        this.userFormGroup.value;
      const birth = this.userFormGroup.value.birth;
      console.log('birth', birth);
      // this.profileService.addClient(this.userFormGroup.value);
      // this.store.dispatch(setLoadingSpinner({ status: true }));
    }
  }

  handleAddressChange(address: any) {
    this.userAddress = address.formatted_address;
    this.userLatitude = address.geometry.location.lat();
    this.userLongitude = address.geometry.location.lng();
  }

  ngOnDestroy() {
    if (this.getLoadingSpinnerSub) {
      this.getLoadingSpinnerSub.unsubscribe();
    }
  }
}
