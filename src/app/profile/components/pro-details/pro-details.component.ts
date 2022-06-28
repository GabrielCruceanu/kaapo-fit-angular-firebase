import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '@/app/profile/model/review.model';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import { Contact } from '@/app/profile/model/profile-interface';
import { DomSanitizer } from '@angular/platform-browser';
import { MatIconRegistry } from '@angular/material/icon';
import { FACEBOOK_ICON, INSTAGRAM_ICON, TWITTER_ICON } from '@/content/icons';
import { getReviews } from '@/app/store/shared/shared.selector';

@Component({
  selector: 'pro-details',
  templateUrl: './pro-details.component.html',
  styleUrls: ['./pro-details.component.scss'],
})
export class ProDetailsComponent implements OnInit {
  @Input() experience: number;
  @Input() type: string;
  @Input() certificate: boolean;
  @Input() description: string;
  @Input() contact: Contact;
  reviews$: Observable<Review[] | null>;

  constructor(
    private store: Store<AppState>,
    private domSanitizer: DomSanitizer,
    private matIconRegistry: MatIconRegistry
  ) {
    this.matIconRegistry.addSvgIconLiteral(
      'facebook',
      this.domSanitizer.bypassSecurityTrustHtml(FACEBOOK_ICON)
    );
    this.matIconRegistry.addSvgIconLiteral(
      'instagram',
      this.domSanitizer.bypassSecurityTrustHtml(INSTAGRAM_ICON)
    );
    this.matIconRegistry.addSvgIconLiteral(
      'twitter',
      this.domSanitizer.bypassSecurityTrustHtml(TWITTER_ICON)
    );
  }

  ngOnInit(): void {
    this.reviews$ = this.store.select(getReviews);
  }
}
