import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import { getLoading } from '@/app/store/shared/shared.selector';
import { Observable, Subscription } from 'rxjs';
import { setErrorMessage } from '@/app/store/shared/shared.actions';

@Component({
  selector: 'add-measurements',
  templateUrl: './add-measurements.component.html',
  styleUrls: ['./add-measurements.component.scss'],
})
export class AddMeasurementsComponent implements OnInit {
  getLoadingSpinnerSub: Subscription;
  errorMessage$: Observable<any>;

  constructor(private store: Store<AppState>) {
    this.store.dispatch(setErrorMessage({ message: '' }));
  }

  addMeasurementsFormGroup = new FormGroup({
    weight: new FormControl('', [Validators.required]),
    neck: new FormControl('', [Validators.required]),
    shoulders: new FormControl('', [Validators.required]),
    chest: new FormControl('', [Validators.required]),
    armLeft: new FormControl('', [Validators.required]),
    armRight: new FormControl('', [Validators.required]),
    waist: new FormControl('', [Validators.required]),
    hip: new FormControl('', [Validators.required]),
    ass: new FormControl('', [Validators.required]),
    thigh: new FormControl('', [Validators.required]),
  });

  ngOnInit(): void {
    this.getLoadingSpinnerSub = this.store
      .select(getLoading)
      .subscribe((isLoading: boolean) => {
        if (isLoading) {
          this.addMeasurementsFormGroup.disable();
        } else {
          this.addMeasurementsFormGroup.enable();
        }
      });
  }
}
