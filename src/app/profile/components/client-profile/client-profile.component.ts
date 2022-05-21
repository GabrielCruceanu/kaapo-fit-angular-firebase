import { Component, OnInit } from '@angular/core';
import { ClientProfile } from '../../model/clientProfile.model';
import { Observable } from 'rxjs';
import { getClientProfile } from '../../store/profile.selector';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';

@Component({
  selector: 'app-client-profile',
  templateUrl: './client-profile.component.html',
  styleUrls: ['./client-profile.component.scss'],
})
export class ClientProfileComponent implements OnInit {
  clientProfileDetails$: Observable<ClientProfile | null> | undefined;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.clientProfileDetails$ = this.store.select(getClientProfile);
  }
}
