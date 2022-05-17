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
import { ProfileService } from '../../profile.service';
import { Appearance } from '@angular-material-extensions/google-maps-autocomplete';
import PlaceResult = google.maps.places.PlaceResult;

@Component({
  selector: 'app-add-client-profile',
  templateUrl: './add-client-profile.component.html',
  styleUrls: ['./add-client-profile.component.scss'],
})
export class AddClientProfileComponent implements OnInit, OnDestroy {
  authType = AuthType;
  getLoadingSpinnerSub: Subscription | undefined;
  errorMessage$: Observable<any> | undefined;

  public appearance = Appearance;
  public zoom: number;
  public latitude: number;
  public longitude: number;

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

  constructor(
    private store: Store<AppState>,
    private profileService: ProfileService
  ) {
    this.store.dispatch(setErrorMessage({ message: '' }));

    this.zoom = 10;
    this.latitude = 52.520008;
    this.longitude = 13.404954;
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
    console.log('this.userFormGroup', this.userFormGroup);
    if (this.userFormGroup.valid) {
      this.profileService.addClient(this.userFormGroup.value);
      this.store.dispatch(setLoadingSpinner({ status: true }));
    }
  }

  public AddressChange(address: any) {
    //setting address from API to local variable
  }

  ngOnDestroy() {
    if (this.getLoadingSpinnerSub) {
      this.getLoadingSpinnerSub.unsubscribe();
    }
  }

  public onAutocompleteSelected(result: PlaceResult) {
    console.log('onAutocompleteSelected: ', result);
  }

  public onLocationSelected(location: Location) {
    console.log('onLocationSelected: ', location);
    // this.latitude = location.latitude;
    // this.longitude = location.longitude;
  }
}
