import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { KAAPO_FIT_LOGO } from '../../../../content/icons';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { Observable } from 'rxjs';
import { isAuthenticated } from '@/app/features/auth/store/auth.selector';
import { autoLogout } from '@/app/features/auth/store/auth.actions';
import { getUserDataMock } from '../../../../data/userDetails';
import { ClientDetails } from '../../../profile/model/profile-interface';

@Component({
  selector: 'app-lp-navigation',
  templateUrl: 'lp-navigation.component.html',
  styleUrls: ['./lp-navigation.component.scss'],
})
export class LpNavigationComponent implements OnInit {
  isAuthenticate?: Observable<boolean>;
  userDetails: ClientDetails;

  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private store: Store<AppState>
  ) {
    this.matIconRegistry.addSvgIconLiteral(
      'kaapo-fit-logo',
      this.domSanitizer.bypassSecurityTrustHtml(KAAPO_FIT_LOGO)
    );

    this.userDetails = getUserDataMock();
  }
  ngOnInit() {
    this.isAuthenticate = this.store.select(isAuthenticated);
  }

  onLogout(event: Event) {
    event.preventDefault();
    this.store.dispatch(autoLogout());
  }
}
