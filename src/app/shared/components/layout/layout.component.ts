import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import {
  getErrorMessage,
  getLoading,
} from '../../../store/shared/shared.selector';
import { isAuthenticated } from '@/app/features/auth/store/auth.selector';
import { autoLogin } from '@/app/features/auth/store/auth.actions';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  showLoading$?: Observable<boolean>;
  isAuthenticated$?: Observable<boolean>;
  errorMessage$?: Observable<string>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.showLoading$ = this.store.select(getLoading);
    this.isAuthenticated$ = this.store.select(isAuthenticated);
    this.errorMessage$ = this.store.select(getErrorMessage);
  }
}
