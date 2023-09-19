import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthType } from '@/app/auth/model/AuthResponseData.model';
import { UserAuth } from '@/app/auth/model/userAuth.model';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { UserProfile } from '../../model/userProfile.model';
import { TrainerExperienceData } from '@/app/profile/data/trainerData';
import {
  UntypedFormControl,
  UntypedFormGroup,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import { ProfileService } from '../../services/profile.service';
import { CountryService } from '@/app/shared/services/country.service';
import {
  setErrorMessage,
  setLoadingSpinner,
} from '@/app/store/shared/shared.actions';
import {
  getErrorMessage,
  getLoading,
} from '@/app/store/shared/shared.selector';
import { getUserAuth } from '@/app/auth/store/auth.selector';
import {
  getNutritionistProfile,
  getUserProfile,
} from '../../store/profile.selector';
import { Contact, UserType } from '../../model/profile-interface';
import {
  createNutritionistProfileStart,
  updateUserProfileStart,
} from '../../store/profile.actions';
import { NutritionistProfile } from '../../model/nutritionistProfile.model';
import * as moment from 'moment';
import { Router } from '@angular/router';
import { NutritionistData } from '@/app/profile/data/nutritionistData';

@Component({
  selector: 'app-add-nutritionist-profile',
  templateUrl: './add-nutritionist-profile.component.html',
  styleUrls: ['./add-nutritionist-profile.component.scss'],
})
export class AddNutritionistProfileComponent implements OnInit, OnDestroy {
  authType = AuthType;
  userAuth: UserAuth | null | undefined;
  userAuthSub: Subscription | undefined;
  userProfile: UserProfile | null | undefined;
  userProfileSub: Subscription | undefined;
  nutritionistProfile: NutritionistProfile | null;
  nutritionistProfileSub: Subscription;
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
  nutritionistType = NutritionistData;
  trainerExperience = TrainerExperienceData;
  nutritionistFormGroup: UntypedFormGroup;

  constructor(
    private store: Store<AppState>,
    private profileService: ProfileService,
    private countryService: CountryService,
    private router: Router
  ) {
    this.store.dispatch(setErrorMessage({ message: '' }));
  }

  ngOnInit(): void {
    this.userAuthSub = this.store.select(getUserAuth).subscribe((userAuth) => {
      this.userAuth = userAuth;
    });

    this.userProfileSub = this.store
      .select(getUserProfile)
      .subscribe((userProfile) => {
        this.userProfile = userProfile;
        if (
          userProfile.userType !== UserType.Nutritionist &&
          userProfile.hasProfile
        ) {
          this.router.navigate(['/profil']);
        }
      });

    this.nutritionistProfileSub = this.store
      .select(getNutritionistProfile)
      .subscribe((nutritionistProfile) => {
        this.nutritionistProfile = nutritionistProfile;
      });

    this.nutritionistFormGroup = new UntypedFormGroup({
      firstname: new UntypedFormControl(
        this.nutritionistProfile?.firstName
          ? this.nutritionistProfile?.firstName
          : '',
        [Validators.required]
      ),
      lastname: new UntypedFormControl(
        this.nutritionistProfile?.lastName
          ? this.nutritionistProfile?.lastName
          : '',
        [Validators.required]
      ),
      description: new UntypedFormControl(
        this.nutritionistProfile?.description
          ? this.nutritionistProfile?.description
          : '',
        [
          Validators.required,
          Validators.minLength(100),
          Validators.maxLength(400),
        ]
      ),
      type: new UntypedFormControl(
        this.nutritionistProfile?.type ? this.nutritionistProfile?.type : '',
        [Validators.required]
      ),
      birth: new UntypedFormControl(
        this.nutritionistProfile?.birth.month
          ? moment([
              this.nutritionistProfile?.birth.year,
              this.nutritionistProfile?.birth.month - 1,
              this.nutritionistProfile?.birth.date,
            ])
          : '',
        [Validators.required]
      ),
      gender: new UntypedFormControl(
        this.nutritionistProfile?.gender
          ? this.nutritionistProfile?.gender
          : '',
        [Validators.required]
      ),
      experience: new UntypedFormControl(
        this.nutritionistProfile?.experience
          ? this.nutritionistProfile?.experience
          : '',
        [Validators.required]
      ),
      phone: new UntypedFormControl(
        this.nutritionistProfile?.contact?.phone
          ? this.nutritionistProfile?.contact?.phone
          : '',
        [Validators.required]
      ),
      country: new UntypedFormControl(
        this.nutritionistProfile?.country
          ? this.nutritionistProfile?.country
          : '',
        [Validators.required, this.onCountryInputValidation(this.onlyCountries)]
      ),
      state: new UntypedFormControl(
        this.nutritionistProfile?.state ? this.nutritionistProfile?.state : '',
        [Validators.required, this.onStateInputValidation(this.onlyStates)]
      ),
      city: new UntypedFormControl(
        this.nutritionistProfile?.city ? this.nutritionistProfile?.city : '',
        [Validators.required]
      ),
      website: new UntypedFormControl(
        this.nutritionistProfile?.contact?.website
          ? this.nutritionistProfile?.contact?.website
          : '',
        [this.profileService.websiteInputValidation()]
      ),
      facebook: new UntypedFormControl(
        this.nutritionistProfile?.contact?.facebook
          ? this.nutritionistProfile?.contact?.facebook
          : '',
        []
      ),
      twitter: new UntypedFormControl(
        this.nutritionistProfile?.contact?.twitter
          ? this.nutritionistProfile?.contact?.twitter
          : '',
        []
      ),
      instagram: new UntypedFormControl(
        this.nutritionistProfile?.contact?.instagram
          ? this.nutritionistProfile?.contact?.instagram
          : '',
        []
      ),
    });

    this.getLoadingSpinnerSub = this.store
      .select(getLoading)
      .subscribe((isLoading: boolean) => {
        if (isLoading) {
          this.nutritionistFormGroup.disable();
        } else {
          this.nutritionistFormGroup.enable();
        }
      });

    this.filteredCountries = this.nutritionistFormGroup.controls[
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

    this.nutritionistFormGroup.controls['state'].disable();
    this.filteredStates = this.nutritionistFormGroup.controls[
      'state'
    ].valueChanges.pipe(
      startWith(''),
      map((value) => {
        this.selectedState = value;
        return this.countryService._filterData(value, this.onlyStates);
      })
    );

    this.nutritionistFormGroup.controls['city'].disable();
    this.filteredCities = this.nutritionistFormGroup.controls[
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

  onNutritionistSubmit() {
    if (
      this.profileService.cityIsNotFromState(
        this.nutritionistFormGroup.controls['city'].value,
        this.onlyCities
      )
    ) {
      this.nutritionistFormGroup.controls['city'].markAsTouched();
      this.nutritionistFormGroup.controls['city'].setErrors({
        isNotCityFromList: true,
      });
    }
    if (this.nutritionistFormGroup.valid && this.userAuth && this.userProfile) {
      const {
        firstname,
        lastname,
        description,
        birth,
        gender,
        type,
        experience,
        country,
        state,
        city,
        phone,
        website,
        facebook,
        twitter,
        instagram,
      } = this.nutritionistFormGroup.value;

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
        website: website,
        facebook: facebook,
        twitter: twitter,
        instagram: instagram,
      };

      const nutritionistProfile = new NutritionistProfile(
        this.userAuth.id,
        UserType.Nutritionist,
        firstname,
        lastname,
        null,
        gender,
        type,
        joinedFinal,
        birthFinal,
        this.nutritionistProfile
          ? this.nutritionistProfile.hasProPremium
          : false,
        this.nutritionistProfile ? this.nutritionistProfile.certificate : false,
        experience,
        country,
        state,
        city,
        contactFinal,
        description,
        this.nutritionistProfile
          ? this.nutritionistProfile.completedClients
          : null,
        this.userProfile.coverImage ? this.userProfile.coverImage : null,
        this.userProfile.profileImage ? this.userProfile.profileImage : null,
        this.nutritionistProfile
          ? this.nutritionistProfile.currentPhysicalDetails
          : null,
        this.nutritionistProfile
          ? this.nutritionistProfile.activeClients
          : null,
        this.nutritionistProfile ? this.nutritionistProfile.gallery : null,
        this.nutritionistProfile ? this.nutritionistProfile.reviews : null
      );

      const userProfile = new UserProfile(
        this.userProfile.id,
        this.userProfile.email,
        this.userProfile.username,
        true,
        this.userProfile.dayJoined,
        this.userProfile.monthJoined,
        this.userProfile.yearJoined,
        UserType.Nutritionist,
        this.userProfile.coverImage ? this.userProfile.coverImage : null,
        this.userProfile.profileImage ? this.userProfile.profileImage : null
      );

      this.store.dispatch(setLoadingSpinner({ status: true }));

      this.store.dispatch(updateUserProfileStart({ userProfile }));

      this.store.dispatch(
        createNutritionistProfileStart({ nutritionistProfile })
      );
    }
  }

  public onDisableInput(disableInput: string, input: string) {
    this.profileService.disableInput(
      this.nutritionistFormGroup,
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
    } else if (this.nutritionistProfileSub) {
      this.nutritionistProfileSub.unsubscribe();
    }
  }
}
