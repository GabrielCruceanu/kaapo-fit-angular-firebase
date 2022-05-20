import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { AuthType } from '../../../auth/model/AuthResponseData.model';
import { UserAuth } from '../../../auth/model/userAuth.model';
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
  createTrainerProfileStart,
  updateUserProfileStart,
} from '../../store/profile.actions';
import { TrainerProfile } from '../../model/trainerProfile.model';
import {
  TrainerData,
  TrainerExperienceData,
} from '../../../../data/trainerData';

@Component({
  selector: 'app-add-trainer-profile',
  templateUrl: './add-trainer-profile.component.html',
  styleUrls: ['./add-trainer-profile.component.scss'],
})
export class AddTrainerProfileComponent implements OnInit, OnDestroy {
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
  trainersType = TrainerData;
  trainerExperience = TrainerExperienceData;

  trainerFormGroup = new FormGroup({
    firstname: new FormControl('', [Validators.required]),
    lastname: new FormControl('', [Validators.required]),
    trainerType: new FormControl('', [Validators.required]),
    birth: new FormControl('', [Validators.required]),
    gender: new FormControl('', [Validators.required]),
    experience: new FormControl('', [Validators.required]),
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
          this.trainerFormGroup.disable();
        } else {
          this.trainerFormGroup.enable();
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

    this.filteredCountries = this.trainerFormGroup.controls[
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

    this.trainerFormGroup.controls['state'].disable();
    this.filteredStates = this.trainerFormGroup.controls[
      'state'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => {
        this.selectedState = value;
        return this.countryService._filterData(value, this.onlyStates);
      })
    );

    this.trainerFormGroup.controls['city'].disable();
    this.filteredCities = this.trainerFormGroup.controls[
      'city'
    ].valueChanges.pipe(
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

  onTrainerSubmit() {
    if (this.trainerFormGroup.valid && this.userAuth && this.userProfile) {
      const {
        firstname,
        lastname,
        trainerType,
        birth,
        gender,
        experience,
        country,
        state,
        city,
        phone,
        facebook,
        twitter,
        instagram,
      } = this.trainerFormGroup.value;

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

      const contactFinal: Contact = {
        phone: phone,
        email: this.userAuth.email,
        facebook: facebook,
        twitter: twitter,
        instagram: instagram,
      };

      const trainerProfile = new TrainerProfile(
        this.userAuth.id,
        UserType.Trainer,
        firstname,
        lastname,
        trainerType,
        gender,
        joinedFinal,
        birthFinal,
        false,
        false,
        experience,
        country,
        state,
        city,
        contactFinal,
        null,
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
        this.userProfile.yearJoined,
        UserType.Trainer
      );

      this.store.dispatch(setLoadingSpinner({ status: true }));

      this.store.dispatch(updateUserProfileStart({ userProfile }));

      this.store.dispatch(createTrainerProfileStart({ trainerProfile }));
    }
  }

  public onDisableInput(disableInput: string, input: string) {
    this.profileService.disableInput(
      this.trainerFormGroup,
      disableInput,
      input
    );
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
