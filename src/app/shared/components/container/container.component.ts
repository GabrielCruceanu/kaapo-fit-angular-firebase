import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { isAuthenticated } from '../../../auth/store/auth.selector';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss'],
})
export class ContainerComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;

  constructor(private store: Store<AppState>) {
    this.isAuthenticated$ = of(false);
  }

  ngOnInit() {
    this.isAuthenticated$ = this.store.select(isAuthenticated);
  }
}
