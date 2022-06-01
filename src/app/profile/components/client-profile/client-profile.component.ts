import { Component, OnInit } from '@angular/core';
import { ClientProfile } from '../../model/clientProfile.model';
import { Observable } from 'rxjs';
import { getClientProfile } from '../../store/profile.selector';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import { MatDialog } from '@angular/material/dialog';
import { AddMeasurementsComponent } from '@/app/profile/view/add-measurements/add-measurements.component';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss'],
})
export class ClientProfileComponent implements OnInit {
  clientProfileDetails$: Observable<ClientProfile | null>;

  constructor(private store: Store<AppState>, private dialog: MatDialog) {}

  ngOnInit(): void {
    this.clientProfileDetails$ = this.store.select(getClientProfile);
  }

  public onAddMeasurements() {
    this.dialog.open(AddMeasurementsComponent);
  }
}
