import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import {
  KAAPO_FIT_LOGO,
  LOGOUT_ICON,
  NOTIFICATION_ICON,
} from '../../../../content/icons';
import { isAuthenticated } from '../../../auth/store/auth.selector';
import { autoLogout } from '../../../auth/store/auth.actions';
import { Observable, of } from 'rxjs';
import { getUserDataMock, UserMock } from '../../../../data/user.mock';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  isAuthenticated$: Observable<boolean>;
  hasNotifications: Observable<boolean>;
  userDetails: UserMock;

  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private store: Store<AppState>
  ) {
    this.matIconRegistry.addSvgIconLiteral(
      'kaapo-fit-logo',
      this.domSanitizer.bypassSecurityTrustHtml(KAAPO_FIT_LOGO)
    );
    this.matIconRegistry.addSvgIconLiteral(
      'notification',
      this.domSanitizer.bypassSecurityTrustHtml(NOTIFICATION_ICON)
    );
    this.matIconRegistry.addSvgIconLiteral(
      'log-out',
      this.domSanitizer.bypassSecurityTrustHtml(LOGOUT_ICON)
    );

    this.isAuthenticated$ = of(false);
    this.hasNotifications = of(true);
    this.userDetails = getUserDataMock();
  }

  ngOnInit(): void {
    this.isAuthenticated$ = this.store.select(isAuthenticated);
  }

  onLogout(event: Event) {
    event.preventDefault();
    this.store.dispatch(autoLogout());
  }
}
