import { Component, Input, OnInit } from '@angular/core';
import { Observable, of, Subscription } from 'rxjs';
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
  @Input() street?: string;
  @Input() streetNo?: string;
  @Input() contact: Contact;
  @Input() viewId: string;
  reviews$: Observable<Review[] | null>;
  reviewsSub: Subscription;

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
    this.reviewsSub = this.store.select(getReviews).subscribe((reviews) => {
      let reviewsCurrentUser;
      if (reviews.length > 0) {
        reviewsCurrentUser = reviews.filter((review) => {
          if (review && review.beneficiaryId === this.viewId) {
            return review;
          }
        });
      }

      this.reviews$ = of(reviewsCurrentUser);
    });
  }
}
