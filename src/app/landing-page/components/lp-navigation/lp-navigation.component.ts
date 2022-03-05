import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { KAAPO_FIT_LOGO } from '../../../../content/icons';
import { Store } from '@ngrx/store';
import { AppState } from '../../../store/app.state';
import { Observable } from 'rxjs';
import { isAuthenticated } from '../../../auth/store/auth.selector';
import { autoLogout } from '../../../auth/store/auth.actions';

@Component({
  selector: 'app-lp-navigation',
  templateUrl: 'lp-navigation.component.html',
  styleUrls: ['./lp-navigation.component.scss'],
})
export class LpNavigationComponent implements OnInit {
  isAuthenticate?: Observable<boolean>;
  constructor(
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry,
    private store: Store<AppState>
  ) {
    this.matIconRegistry.addSvgIconLiteral(
      'kaapo-fit-logo',
      this.domSanitizer.bypassSecurityTrustHtml(KAAPO_FIT_LOGO)
    );
  }
  ngOnInit() {
    this.isAuthenticate = this.store.select(isAuthenticated);
  }

  onLogout(event: Event) {
    event.preventDefault();
    this.store.dispatch(autoLogout());
  }
}
