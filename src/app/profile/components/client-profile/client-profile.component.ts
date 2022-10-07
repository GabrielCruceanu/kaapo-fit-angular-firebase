import { Component, OnInit } from '@angular/core';
import {
  ClientPhysicalDetails,
  ClientProfile,
} from '../../model/clientProfile.model';
import { Observable } from 'rxjs';
import {
  getClientProfile,
  getHistoryPhysicalDetails,
} from '../../store/profile.selector';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import { MatDialog } from '@angular/material/dialog';
import { AddMeasurementsComponent } from '@/app/profile/view/add-measurements/add-measurements.component';
import { getClientHistoryPhysicalDetails } from '@/app/profile/store/profile.actions';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss'],
})
export class ClientProfileComponent implements OnInit {
  clientProfileDetails$: Observable<ClientProfile | null>;
  clientProfileDetails: ClientProfile | null;
  public currentDay: number;
  public currentMonth: number;
  public currentYear: number;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {
    this.currentDay = new Date().getUTCDate();
    this.currentMonth = new Date().getUTCMonth() + 2;
    this.currentYear = new Date().getUTCFullYear();
  }

  ngOnInit(): void {
    this.clientProfileDetails$ = this.store.select(getClientProfile);
    this.clientProfileDetails$.subscribe((clientProfileDetails) => {
      console.log('clientProfileDetails', clientProfileDetails);
    });
  }

  public onAddMeasurements() {
    this.dialog.open(AddMeasurementsComponent);
  }
}
