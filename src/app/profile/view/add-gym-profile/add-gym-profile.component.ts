import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserAuth } from '../../../auth/model/userAuth.model';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { UserProfile } from '../../model/userProfile.model';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { ProfileService } from '../../services/profile.service';
import { CountryService } from '../../../shared/services/country.service';
import {
  setErrorMessage,
  setLoadingSpinner,
} from '../../../store/shared/shared.actions';
import {
  getErrorMessage,
  getLoading,
} from '../../../store/shared/shared.selector';
import { getUserAuth } from '../../../auth/store/auth.selector';
import { getUserProfile } from '../../store/profile.selector';
import { Contact, UserType } from '../../model/profile-interface';
import {
  createGymProfileStart,
  updateUserProfileStart,
} from '../../store/profile.actions';
import { GymProfile } from '../../model/gym.model';
import { GymData } from '../../../../data/gymData';

@Component({
  selector: 'app-add-gym-profile',
  templateUrl: './add-gym-profile.component.html',
  styleUrls: ['./add-gym-profile.component.scss'],
})
export class AddGymProfileComponent implements OnInit, OnDestroy {
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
  gymTypes = GymData;

  gymFormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    gymType: new FormControl('', [Validators.required]),
    country: new FormControl('', [
      Validators.required,
      this.onCountryInputValidation(this.onlyCountries),
    ]),
    state: new FormControl('', [
      Validators.required,
      this.onStateInputValidation(this.onlyStates),
    ]),
    city: new FormControl('', [Validators.required]),
    street: new FormControl('', [Validators.required]),
    strNo: new FormControl('', [Validators.required]),
    phone: new FormControl('', [Validators.required]),
    facebook: new FormControl('', []),
    twitter: new FormControl('', []),
    instagram: new FormControl('', []),
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
          this.gymFormGroup.disable();
        } else {
          this.gymFormGroup.enable();
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

    this.filteredCountries = this.gymFormGroup.controls[
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

    this.gymFormGroup.controls['state'].disable();
    this.filteredStates = this.gymFormGroup.controls['state'].valueChanges.pipe(
      startWith(''),
      map((value) => {
        this.selectedState = value;
        return this.countryService._filterData(value, this.onlyStates);
      })
    );

    this.gymFormGroup.controls['city'].disable();
    this.filteredCities = this.gymFormGroup.controls['city'].valueChanges.pipe(
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

  onGymSubmit() {
    if (this.gymFormGroup.valid && this.userAuth && this.userProfile) {
      const {
        name,
        gymType,
        phone,
        country,
        state,
        city,
        street,
        strNo,
        facebook,
        twitter,
        instagram,
      } = this.gymFormGroup.value;

      const joinedFinal = {
        date: this.userProfile.dayJoined,
        month: this.userProfile.monthJoined,
        year: this.userProfile.yearJoined,
      };

      const contactFinal: Contact = {
        phone: phone,
        email: this.userAuth.email,
        facebook: facebook,
        twitter,
        instagram,
      };

      const gymProfile = new GymProfile(
        this.userAuth.id,
        UserType.Gym,
        name,
        joinedFinal,
        false,
        gymType,
        country,
        state,
        city,
        street,
        strNo,
        contactFinal,
        null,
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
        this.userProfile.yearJoined
      );

      this.store.dispatch(setLoadingSpinner({ status: true }));

      this.store.dispatch(updateUserProfileStart({ userProfile }));

      this.store.dispatch(createGymProfileStart({ gymProfile }));
    }
  }

  public onDisableInput(disableInput: string, input: string) {
    this.profileService.disableInput(this.gymFormGroup, disableInput, input);
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
