import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { Review } from '@/app/profile/model/review.model';
import SwiperCore, { Navigation, Pagination, Virtual } from 'swiper';
import { SwiperComponent } from 'swiper/angular';

// install Swiper modules
SwiperCore.use([Virtual, Navigation, Pagination]);

@Component({
  selector: 'reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.scss'],
})
export class ReviewsComponent implements OnInit {
  @Input() reviews$: Observable<Review[] | null>;

  @ViewChild('swiper', { static: false }) swiper?: SwiperComponent;

  sampleUserProfileImage = '../../../../assets/images/user.jpg';

  constructor() {}

  ngOnInit(): void {}
}
