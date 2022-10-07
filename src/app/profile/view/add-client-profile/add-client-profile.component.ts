import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { AuthType } from '@/app/auth/model/AuthResponseData.model';
import { map, Observable, startWith, Subscription } from 'rxjs';
import {
  FormControl,
  FormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import {
  setErrorMessage,
  setLoadingSpinner,
} from '@/app/store/shared/shared.actions';
import {
  getErrorMessage,
  getLoading,
} from '@/app/store/shared/shared.selector';
import { ProfileService } from '../../services/profile.service';
import { UserAuth } from '@/app/auth/model/userAuth.model';
import { getUserAuth } from '@/app/auth/store/auth.selector';
import { CountryService } from '@/app/shared/services/country.service';
import { ClientProfile } from '../../model/clientProfile.model';
import { UserType } from '../../model/profile-interface';
import { UserProfile } from '../../model/userProfile.model';
import { getClientProfile, getUserProfile } from '../../store/profile.selector';
import {
  createClientProfileStart,
  updateUserProfileStart,
} from '../../store/profile.actions';
import * as moment from 'moment';

@Component({
  selector: 'app-add-client-profile',
  templateUrl: './add-client-profile.component.html',
  styleUrls: ['./add-client-profile.component.scss'],
})
export class AddClientProfileComponent implements OnInit, OnDestroy {
  authType = AuthType;
  userAuth: UserAuth | null;
  userAuthSub: Subscription;
  userProfile: UserProfile | null;
  userProfileSub: Subscription;
  clientProfile: ClientProfile | null;
  clientProfileSub: Subscription;
  getLoadingSpinnerSub: Subscription;
  errorMessage$: Observable<any>;
  onlyCountries = this.countryService.mapCountriesData();
  filteredCountries: Observable<string[]>;
  selectedCountry: string = '';
  onlyStates = this.countryService.mapStatesData();
  filteredStates: Observable<string[]>;
  selectedState: string = '';
  onlyCities = this.countryService.mapCitiesData();
  filteredCities$: Observable<string[]>;
  filteredCities: string[];
  selectedCity: string = '';
  clientFormGroup: FormGroup;

  constructor(
    private store: Store<AppState>,
    private profileService: ProfileService,
    private countryService: CountryService
  ) {
    this.store.dispatch(setErrorMessage({ message: '' }));
    this.clientFormGroup = new FormGroup({
      firstname: new FormControl(''),
      lastname: new FormControl(''),
      birth: new FormControl(''),
      gender: new FormControl(''),
      phone: new FormControl(''),
      country: new FormControl(''),
      state: new FormControl(''),
      city: new FormControl(''),
    });
  }

  ngOnInit(): void {
    this.userAuthSub = this.store.select(getUserAuth).subscribe((userAuth) => {
      this.userAuth = userAuth;
    });

    this.userProfileSub = this.store
      .select(getUserProfile)
      .subscribe((userProfile) => {
        this.userProfile = userProfile;
      });

    this.clientProfileSub = this.store
      .select(getClientProfile)
      .subscribe((clientProfile) => {
        this.clientProfile = clientProfile;
      });
    console.log('this.filteredCities before form ', this.filteredCities);

    this.clientFormGroup = new FormGroup({
      firstname: new FormControl(
        this.clientProfile?.firstName ? this.clientProfile?.firstName : '',
        [Validators.required]
      ),
      lastname: new FormControl(
        this.clientProfile?.lastName ? this.clientProfile?.lastName : '',
        [Validators.required]
      ),
      birth: new FormControl(
        this.clientProfile?.birth.month
          ? moment([
              this.clientProfile?.birth.year,
              this.clientProfile?.birth.month - 1,
              this.clientProfile?.birth.date,
            ])
          : '',
        [Validators.required]
      ),
      gender: new FormControl(
        this.clientProfile?.gender ? this.clientProfile?.gender : '',
        [Validators.required]
      ),
      phone: new FormControl(
        this.clientProfile?.phone ? this.clientProfile?.phone : '',
        [Validators.required]
      ),
      country: new FormControl(
        this.clientProfile?.country ? this.clientProfile?.country : '',
        [Validators.required, this.onCountryInputValidation(this.onlyCountries)]
      ),
      state: new FormControl(
        this.clientProfile?.state ? this.clientProfile?.state : '',
        [Validators.required, this.onStateInputValidation(this.onlyStates)]
      ),
      city: new FormControl(
        this.clientProfile?.city ? this.clientProfile?.city : '',
        [Validators.required, this.onCityInputValidation(this.onlyCities)]
      ),
    });

    this.filteredCountries = this.clientFormGroup.controls[
      'country'
    ].valueChanges.pipe(
      startWith(this.clientProfile?.country ? this.clientProfile?.country : ''),
      map((value) => {
        this.selectedCountry = value;
        this.onlyStates =
          this.countryService.mapStateFromSelectedCountryData(value);

        return this.countryService._filterData(value, this.onlyCountries);
      })
    );

    this.filteredStates = this.clientFormGroup.controls[
      'state'
    ].valueChanges.pipe(
      startWith(this.clientProfile?.state ? this.clientProfile?.state : ''),
      map((value) => {
        this.selectedState = value;
        return this.countryService._filterData(value, this.onlyStates);
      })
    );

    this.filteredCities$ = this.clientFormGroup.controls[
      'city'
    ].valueChanges.pipe(
      startWith(this.clientProfile?.city ? this.clientProfile?.city : ''),
      map((value) => {
        this.selectedCity = value;
        this.onlyCities = this.countryService.mapCityFromSelectedCountryData(
          this.selectedCountry,
          this.selectedState
        );
        this.filteredCities = this.countryService._filterData(
          value,
          this.onlyCities
        );
        return this.filteredCities;
      })
    );

    this.clientFormGroup.controls['state'].disable();
    this.clientFormGroup.controls['city'].disable();

    this.getLoadingSpinnerSub = this.store
      .select(getLoading)
      .subscribe((isLoading: boolean) => {
        if (isLoading) {
          this.clientFormGroup.disable();
        } else {
          this.clientFormGroup.enable();
        }
      });
    this.errorMessage$ = this.store.select(getErrorMessage);
  }

  onClientSubmit() {
    if (
      this.profileService.cityIsNotFromState(
        this.clientFormGroup.controls['city'].value,
        this.onlyCities
      )
    ) {
      this.clientFormGroup.controls['city'].markAsTouched();
      this.clientFormGroup.controls['city'].setErrors({
        isNotCityFromList: true,
      });
    } else if (
      this.clientFormGroup.valid &&
      this.userAuth &&
      this.userProfile
    ) {
      const {
        firstname,
        lastname,
        birth,
        gender,
        phone,
        country,
        state,
        city,
      } = this.clientFormGroup.value;

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
        null,
        this.userAuth.email,
        phone,
        gender,
        country,
        state,
        city,
        this.clientProfile.hasPremium ? this.clientProfile.hasPremium : false,
        birthFinal,
        joinedFinal,
        this.clientProfile.profilePicture
          ? this.clientProfile.profilePicture
          : null,
        this.clientProfile.currentPhysicalDetails
          ? this.clientProfile.currentPhysicalDetails
          : null,
        this.clientProfile.nutritionist
          ? this.clientProfile.nutritionist
          : null,
        this.clientProfile.trainer ? this.clientProfile.trainer : null,
        this.clientProfile.gym ? this.clientProfile.gym : null
      );

      const userProfile = new UserProfile(
        this.userProfile.id,
        this.userProfile.email,
        true,
        this.userProfile.dayJoined,
        this.userProfile.monthJoined,
        this.userProfile.yearJoined,
        UserType.Client,
        this.userProfile.coverImage ? this.userProfile.coverImage : null,
        this.userProfile.profileImage ? this.userProfile.profileImage : null
      );

      this.store.dispatch(setLoadingSpinner({ status: true }));

      this.store.dispatch(updateUserProfileStart({ userProfile }));

      this.store.dispatch(createClientProfileStart({ clientProfile }));
    }
  }

  public onDisableInput(disableInput: string, input: string) {
    this.profileService.disableInput(this.clientFormGroup, disableInput, input);
  }

  public onCountryInputValidation(countries: string[]): ValidatorFn {
    return this.profileService.countryInputValidation(countries);
  }

  public onStateInputValidation(states: string[]): ValidatorFn {
    return this.profileService.stateInputValidation(states);
  }

  public onCityInputValidation(cites: string[]): ValidatorFn {
    return this.profileService.cityInputValidation(cites);
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
