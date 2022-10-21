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
  facebookFormated: string | null;
  twitterFormated: string | null;
  instaFormated: string | null;

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
      let reviewsCurrentUser = [];
      if (reviews) {
        reviews.map((review: Review) => {
          if (review.beneficiaryId === this.viewId) {
            reviewsCurrentUser.push(review);
          }
        });
      }

      this.reviews$ = of(reviewsCurrentUser);
    });
  }

  handleFacebookUsernameFormatted(link?: string) {
    const facebookLinkHttps = 'https://www.facebook.com/';
    const facebookLinkHttp = 'http://www.facebook.com/';
    const facebookLinkWww = 'www.facebook.com/';
    let username;
    if (link && link.includes(facebookLinkHttps)) {
      username = link.slice(25);
    } else if (link && link.includes(facebookLinkHttp)) {
      username = link.slice(24);
    } else if (link && link.includes(facebookLinkWww)) {
      username = link.slice(17);
    } else {
      username = this.contact.facebook;
    }
    return username;
  }
  handleInstagramUsernameFormatted(link?: string) {
    const instagramLinkHttps = 'https://www.instagram.com/';
    const instagramLinkHttp = 'http://www.instagram.com/';
    const instagramLinkWww = 'www.instagram.com/';
    let username;
    if (link && link.includes(instagramLinkHttps)) {
      username = link.slice(26);
    } else if (link && link.includes(instagramLinkHttp)) {
      username = link.slice(25);
    } else if (link && link.includes(instagramLinkWww)) {
      username = link.slice(18);
    } else {
      username = this.contact.instagram;
    }
    return username;
  }
  handleTwitterUsernameFormatted(link?: string) {
    const twitterLinkHttps = 'https://www.twitter.com/';
    const twitterLinkHttp = 'http://www.twitter.com/';
    const twitterLinkWww = 'www.twitter.com/';
    let username;
    if (link && link.includes(twitterLinkHttps)) {
      username = link.slice(26);
    } else if (link && link.includes(twitterLinkHttp)) {
      username = link.slice(25);
    } else if (link && link.includes(twitterLinkWww)) {
      username = link.slice(18);
    } else {
      username = this.contact.twitter;
    }
    return username;
  }
}
