import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthType } from '../../../auth/model/AuthResponseData.model';
import { map, Observable, of, startWith, Subscription } from 'rxjs';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
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
import { CountriesData, Country, State } from '../../../../data/country';
import { CountryService } from '../../../shared/services/country.service';

@Component({
  selector: 'app-add-client-profile',
  templateUrl: './add-client-profile.component.html',
  styleUrls: ['./add-client-profile.component.scss'],
})
export class AddClientProfileComponent implements OnInit, OnDestroy {
  authType = AuthType;
  userAuth: UserAuth | null | undefined;
  userAuthSub: Subscription | undefined;
  getLoadingSpinnerSub: Subscription | undefined;
  errorMessage$: Observable<any> | undefined;
  onlyCountries = this.countryService.mapCountriesData();
  filteredCountries: Observable<string[]> | undefined;
  selectedCountry: string = '';
  onlyStates = this.countryService.mapStatesData();
  filteredStates: Observable<string[]> | undefined;
  selectedState: string = '';
  onlyCities = this.countryService.mapCitiesData();
  filteredCities: Observable<string[]> | undefined;
  selectedCity: string = '';

  userFormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    birth: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    country: new FormControl('', [
      Validators.required,
      countryInputValidation(this.onlyCountries),
    ]),
    state: new FormControl('', [
      Validators.required,
      stateInputValidation(this.onlyStates),
    ]),
    city: new FormControl('', [Validators.required]),
  });

  constructor(
    private store: Store<AppState>,
    private profileService: ProfileService,
    private countryService: CountryService
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

    this.filteredCountries = this.userFormGroup.controls[
      'country'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => {
        this.selectedCountry = value;
        this.onlyStates =
          this.countryService.mapStateFromSelectedCountryData(value);

        return this.countryService._filterData(value, this.onlyCountries);
      })
    );

    this.filteredStates = this.userFormGroup.controls[
      'state'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => {
        this.selectedState = value;
        return this.countryService._filterData(value, this.onlyStates);
      })
    );

    this.filteredCities = this.userFormGroup.controls['city'].valueChanges.pipe(
      startWith(''),
      map((value) => {
        this.selectedCity = value;
        this.onlyCities = this.countryService.mapCityFromSelectedCountryData(
          this.selectedCountry,
          this.selectedState
        );

        return this.countryService._filterData(value, this.onlyCities);
      })
    );

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

  public onDisableInput(disableInput: string, input: string) {
    this.profileService.disableInput(this.userFormGroup, disableInput, input);
  }

  ngOnDestroy() {
    if (this.getLoadingSpinnerSub) {
      this.getLoadingSpinnerSub.unsubscribe();
    }
  }
}

export function countryInputValidation(countries: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const countryValue = countries.find((country) => country === value);

    return !countryValue ? { isNotCountryFromList: true } : null;
  };
}

export function stateInputValidation(states: string[]): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;

    if (!value) {
      return null;
    }

    const sateValue = states.find((state) => state === value);

    return !sateValue ? { isNotStateFromList: true } : null;
  };
}
