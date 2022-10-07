import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { SwiperComponent } from 'swiper/angular';
import { SwiperOptions } from 'swiper';
import { Observable } from 'rxjs';
import { ClientPhysicalDetails } from '@/app/profile/model/clientProfile.model';
import { getHistoryPhysicalDetails } from '@/app/profile/store/profile.selector';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
// import Swiper core and required modules
import SwiperCore, { Pagination } from 'swiper';

// install Swiper modules
SwiperCore.use([Pagination]);

@Component({
  selector: 'user-profile-history',
  templateUrl: './user-profile-history.component.html',
  styleUrls: ['./user-profile-history.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserProfileHistoryComponent implements OnInit {
  @ViewChild('swiperHistory', { static: false }) swiper?: SwiperComponent;
  historyPhysicalDetails$: Observable<ClientPhysicalDetails[] | null>;
  currentDay: number;
  currentMonth: number;
  currentYear: number;

  config: SwiperOptions = {
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };
  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.historyPhysicalDetails$ = this.store.select(getHistoryPhysicalDetails);
    this.historyPhysicalDetails$.subscribe((historyPhysicalDetails) => {
      console.log('historyPhysicalDetails', historyPhysicalDetails);
    });
  }
}
