import { Component, OnDestroy, OnInit } from '@angular/core';
import { map, Observable, startWith, Subscription } from 'rxjs';
import { AuthType } from '@/app/auth/model/AuthResponseData.model';
import { UserAuth } from '@/app/auth/model/userAuth.model';
import { UserProfile } from '../../model/userProfile.model';
import {
  FormControl,
  FormGroup,
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
  getTrainerProfile,
  getUserProfile,
} from '../../store/profile.selector';
import { Contact, UserType } from '../../model/profile-interface';
import {
  createTrainerProfileStart,
  updateUserProfileStart,
} from '../../store/profile.actions';
import { TrainerProfile } from '../../model/trainerProfile.model';
import {
  TrainerData,
  TrainerExperienceData,
} from '@/app/profile/data/trainerData';
import * as moment from 'moment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-trainer-profile',
  templateUrl: './add-trainer-profile.component.html',
  styleUrls: ['./add-trainer-profile.component.scss'],
})
export class AddTrainerProfileComponent implements OnInit, OnDestroy {
  authType = AuthType;
  userAuth: UserAuth | null;
  userAuthSub: Subscription;
  userProfile: UserProfile | null;
  userProfileSub: Subscription;
  trainerProfile: TrainerProfile | null;
  trainerProfileSub: Subscription;
  getLoadingSpinnerSub: Subscription;
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
  trainerFormGroup: FormGroup;
  urlRegEx =
    '[-a-zA-Z0-9@:%_+.~#?&//=]{2,256}(.[a-z]{2,4})?\b(/[-a-zA-Z0-9@:%_+.~#?&//=]*)?';

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
          userProfile.userType !== UserType.Trainer &&
          userProfile.hasProfile
        ) {
          this.router.navigate(['/profil']);
        }
      });

    this.trainerProfileSub = this.store
      .select(getTrainerProfile)
      .subscribe((trainerProfile) => {
        this.trainerProfile = trainerProfile;
      });

    this.trainerFormGroup = new FormGroup({
      firstname: new FormControl(
        this.trainerProfile?.firstName ? this.trainerProfile?.firstName : '',
        [Validators.required]
      ),
      lastname: new FormControl(
        this.trainerProfile?.lastName ? this.trainerProfile?.lastName : '',
        [Validators.required]
      ),
      description: new FormControl(
        this.trainerProfile?.description
          ? this.trainerProfile?.description
          : '',
        [
          Validators.required,
          Validators.minLength(100),
          Validators.maxLength(400),
        ]
      ),
      trainerType: new FormControl(
        this.trainerProfile?.type ? this.trainerProfile?.type : '',
        [Validators.required]
      ),
      birth: new FormControl(
        this.trainerProfile?.birth.month
          ? moment([
              this.trainerProfile?.birth.year,
              this.trainerProfile?.birth.month - 1,
              this.trainerProfile?.birth.date,
            ])
          : '',
        [Validators.required]
      ),
      gender: new FormControl(
        this.trainerProfile?.gender ? this.trainerProfile?.gender : '',
        [Validators.required]
      ),
      experience: new FormControl(
        this.trainerProfile?.experience ? this.trainerProfile?.experience : '',
        [Validators.required]
      ),
      phone: new FormControl(
        this.trainerProfile?.contact?.phone
          ? this.trainerProfile?.contact?.phone
          : '',
        [Validators.required]
      ),
      country: new FormControl(
        this.trainerProfile?.country ? this.trainerProfile?.country : '',
        [Validators.required, this.onCountryInputValidation(this.onlyCountries)]
      ),
      state: new FormControl(
        this.trainerProfile?.state ? this.trainerProfile?.state : '',
        [Validators.required, this.onStateInputValidation(this.onlyStates)]
      ),
      city: new FormControl(
        this.trainerProfile?.city ? this.trainerProfile?.city : '',
        [Validators.required]
      ),
      website: new FormControl(
        this.trainerProfile?.contact?.website
          ? this.trainerProfile?.contact?.website
          : '',
        [this.profileService.websiteInputValidation()]
      ),
      facebook: new FormControl(
        this.trainerProfile?.contact?.facebook
          ? this.trainerProfile?.contact?.facebook
          : ''
      ),
      twitter: new FormControl(
        this.trainerProfile?.contact?.twitter
          ? this.trainerProfile?.contact?.twitter
          : ''
      ),
      instagram: new FormControl(
        this.trainerProfile?.contact?.instagram
          ? this.trainerProfile?.contact?.instagram
          : ''
      ),
    });

    this.getLoadingSpinnerSub = this.store
      .select(getLoading)
      .subscribe((isLoading: boolean) => {
        if (isLoading) {
          this.trainerFormGroup.disable();
        } else {
          this.trainerFormGroup.enable();
        }
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
    if (
      this.profileService.cityIsNotFromState(
        this.trainerFormGroup.controls['city'].value,
        this.onlyCities
      )
    ) {
      this.trainerFormGroup.controls['city'].markAsTouched();
      this.trainerFormGroup.controls['city'].setErrors({
        isNotCityFromList: true,
      });
    }
    if (this.trainerFormGroup.valid && this.userAuth && this.userProfile) {
      const {
        firstname,
        lastname,
        description,
        trainerType,
        birth,
        gender,
        experience,
        country,
        state,
        city,
        phone,
        website,
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
        website: website,
        facebook: facebook,
        twitter: twitter,
        instagram: instagram,
      };

      const trainerProfile = new TrainerProfile(
        this.userAuth.id,
        UserType.Trainer,
        firstname,
        lastname,
        null,
        trainerType,
        gender,
        joinedFinal,
        birthFinal,
        this.trainerProfile ? this.trainerProfile.hasProPremium : false,
        this.trainerProfile ? this.trainerProfile.certificate : false,
        experience,
        country,
        state,
        city,
        contactFinal,
        description,
        this.trainerProfile ? this.trainerProfile.completedClients : null,
        this.userProfile.coverImage ? this.userProfile.coverImage : null,
        this.userProfile.profileImage ? this.userProfile.profileImage : null,
        this.trainerProfile ? this.trainerProfile.currentPhysicalDetails : null,
        this.trainerProfile ? this.trainerProfile.activeClients : null,
        this.trainerProfile ? this.trainerProfile.gallery : null,
        this.trainerProfile ? this.trainerProfile.reviews : null
      );

      const userProfile = new UserProfile(
        this.userProfile.id,
        this.userProfile.email,
        this.userProfile.username,
        true,
        this.userProfile.dayJoined,
        this.userProfile.monthJoined,
        this.userProfile.yearJoined,
        UserType.Trainer,
        this.userProfile.coverImage ? this.userProfile.coverImage : null,
        this.userProfile.profileImage ? this.userProfile.profileImage : null
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
    } else if (this.trainerProfileSub) {
      this.trainerProfileSub.unsubscribe();
    }
  }
}
