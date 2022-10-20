import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserAuth } from '@/app/auth/model/userAuth.model';
import { map, Observable, startWith, Subscription } from 'rxjs';
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
import { getGymProfile, getUserProfile } from '../../store/profile.selector';
import { Contact, UserType } from '../../model/profile-interface';
import {
  createGymProfileStart,
  updateUserProfileStart,
} from '../../store/profile.actions';
import { GymProfile } from '../../model/gym.model';
import { GymData } from '@/data/gymData';
import { Router } from '@angular/router';

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
  gymProfile: GymProfile | null;
  gymProfileSub: Subscription;
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
  gymFormGroup: FormGroup;
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

        if (userProfile.userType !== UserType.Gym && userProfile.hasProfile) {
          this.router.navigate(['/profil']);
        }
      });

    this.gymProfileSub = this.store
      .select(getGymProfile)
      .subscribe((gymProfile) => {
        this.gymProfile = gymProfile;
      });

    this.gymFormGroup = new FormGroup({
      name: new FormControl(
        this.gymProfile?.name ? this.gymProfile?.name : '',
        [Validators.required]
      ),
      gymType: new FormControl(
        this.gymProfile?.type ? this.gymProfile?.type : '',
        [Validators.required]
      ),
      description: new FormControl(
        this.gymProfile?.description ? this.gymProfile?.description : '',
        [
          Validators.required,
          Validators.minLength(100),
          Validators.maxLength(400),
        ]
      ),
      country: new FormControl(
        this.gymProfile?.country ? this.gymProfile?.country : '',
        [Validators.required, this.onCountryInputValidation(this.onlyCountries)]
      ),
      state: new FormControl(
        this.gymProfile?.state ? this.gymProfile?.state : '',
        [Validators.required, this.onStateInputValidation(this.onlyStates)]
      ),
      city: new FormControl(
        this.gymProfile?.city ? this.gymProfile?.city : '',
        [Validators.required]
      ),
      street: new FormControl(
        this.gymProfile?.street ? this.gymProfile?.street : '',
        [Validators.required]
      ),
      strNo: new FormControl(
        this.gymProfile?.strNo ? this.gymProfile?.strNo : '',
        [Validators.required]
      ),
      phone: new FormControl(
        this.gymProfile?.contact?.phone ? this.gymProfile?.contact?.phone : '',
        [Validators.required]
      ),
      website: new FormControl(
        this.gymProfile?.contact?.website
          ? this.gymProfile?.contact?.website
          : '',
        [this.profileService.websiteInputValidation()]
      ),
      facebook: new FormControl(
        this.gymProfile?.contact?.facebook
          ? this.gymProfile?.contact?.facebook
          : '',
        []
      ),
      twitter: new FormControl(
        this.gymProfile?.contact?.twitter
          ? this.gymProfile?.contact?.twitter
          : '',
        []
      ),
      instagram: new FormControl(
        this.gymProfile?.contact?.instagram
          ? this.gymProfile?.contact?.instagram
          : '',
        []
      ),
    });

    this.getLoadingSpinnerSub = this.store
      .select(getLoading)
      .subscribe((isLoading: boolean) => {
        if (isLoading) {
          this.gymFormGroup.disable();
        } else {
          this.gymFormGroup.enable();
        }
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
        description,
        phone,
        country,
        state,
        city,
        street,
        strNo,
        website,
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
        website: website,
        facebook: facebook,
        twitter: twitter,
        instagram: instagram,
      };

      const gymProfile = new GymProfile(
        this.userAuth.id,
        UserType.Gym,
        null,
        null,
        name,
        joinedFinal,
        this.gymProfile ? this.gymProfile.hasProPremium : false,
        true,
        gymType,
        country,
        state,
        city,
        street,
        strNo,
        contactFinal,
        description,
        this.userProfile.coverImage ? this.userProfile.coverImage : null,
        this.userProfile.profileImage ? this.userProfile.profileImage : null,
        this.gymProfile ? this.gymProfile.gallery : null,
        this.gymProfile ? this.gymProfile.reviews : null,
        this.gymProfile ? this.gymProfile.personal : null
      );

      const userProfile = new UserProfile(
        this.userProfile.id,
        this.userProfile.email,
        this.userProfile.username,
        true,
        this.userProfile.dayJoined,
        this.userProfile.monthJoined,
        this.userProfile.yearJoined,
        UserType.Gym,
        this.userProfile.coverImage ? this.userProfile.coverImage : null,
        this.userProfile.profileImage ? this.userProfile.profileImage : null
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
    } else if (this.gymProfileSub) {
      this.gymProfileSub.unsubscribe();
    }
  }
}
