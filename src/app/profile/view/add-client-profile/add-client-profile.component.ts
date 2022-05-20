import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthType } from '../../../auth/model/AuthResponseData.model';
import { map, Observable, startWith, Subscription } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
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
import { ProfileService } from '../../services/profile.service';
import { UserAuth } from '../../../auth/model/userAuth.model';
import { getUserAuth } from '../../../auth/store/auth.selector';
import { CountryService } from '../../../shared/services/country.service';
import { ClientProfile } from '../../model/clientProfile.model';
import { UserType } from '../../model/profile-interface';
import { UserProfile } from '../../model/userProfile.model';
import { getUserProfile } from '../../store/profile.selector';
import {
  createClientProfileStart,
  updateUserProfileStart,
} from '../../store/profile.actions';

@Component({
  selector: 'app-add-client-profile',
  templateUrl: './add-client-profile.component.html',
  styleUrls: ['./add-client-profile.component.scss'],
})
export class AddClientProfileComponent implements OnInit, OnDestroy {
  authType = AuthType;
  userAuth: UserAuth | null | undefined;
  userAuthSub: Subscription | undefined;
  userProfile: UserProfile | null | undefined;
  userProfileSub: Subscription | undefined;
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
      this.onCountryInputValidation(this.onlyCountries),
    ]),
    state: new FormControl('', [
      Validators.required,
      this.onStateInputValidation(this.onlyStates),
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

    this.userProfileSub = this.store
      .select(getUserProfile)
      .subscribe((userProfile) => {
        this.userProfile = userProfile;
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

    this.userFormGroup.controls['state'].disable();
    this.filteredStates = this.userFormGroup.controls[
      'state'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => {
        this.selectedState = value;
        return this.countryService._filterData(value, this.onlyStates);
      })
    );

    this.userFormGroup.controls['city'].disable();
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

  onClientSubmit() {
    if (this.userFormGroup.valid && this.userAuth && this.userProfile) {
      const {
        firstname,
        lastname,
        birth,
        gender,
        phone,
        country,
        state,
        city,
      } = this.userFormGroup.value;

      const birthFinal = {
        date: birth.date(),
        month: birth.month() + 1,
        year: birth.year(),
      };

      const joinedFinal = {
        date: this.userProfile.dayJoined,
        month: this.userProfile.monthJoined,
        year: this.userProfile.yearJoined,
      };

      const clientProfile = new ClientProfile(
        this.userAuth.id,
        UserType.Client,
        firstname,
        lastname,
        this.userAuth.email,
        phone,
        gender,
        country,
        state,
        city,
        false,
        birthFinal,
        joinedFinal,
        null,
        null,
        null,
        null,
        null
      );

      const userProfile = new UserProfile(
        this.userProfile.id,
        this.userProfile.email,
        true,
        this.userProfile.dayJoined,
        this.userProfile.monthJoined,
        this.userProfile.yearJoined,
        UserType.Client
      );

      this.store.dispatch(setLoadingSpinner({ status: true }));

      this.store.dispatch(updateUserProfileStart({ userProfile }));

      this.store.dispatch(createClientProfileStart({ clientProfile }));
    }
  }

  public onDisableInput(disableInput: string, input: string) {
    this.profileService.disableInput(this.userFormGroup, disableInput, input);
  }

  public onCountryInputValidation(countries: string[]): ValidatorFn {
    return this.profileService.countryInputValidation(countries);
  }

  public onStateInputValidation(states: string[]): ValidatorFn {
    return this.profileService.stateInputValidation(states);
  }

  ngOnDestroy() {
    if (this.getLoadingSpinnerSub) {
      this.getLoadingSpinnerSub.unsubscribe();
    } else if (this.userAuthSub) {
      this.userAuthSub.unsubscribe();
    } else if (this.userProfileSub) {
      this.userProfileSub.unsubscribe();
    }
  }
}
