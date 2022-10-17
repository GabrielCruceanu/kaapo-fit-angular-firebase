import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
// import Swiper core and required modules
import SwiperCore, { Pagination, SwiperOptions } from 'swiper';
import { Observable, Subscription } from 'rxjs';
import { ClientPhysicalDetails } from '@/app/profile/model/clientProfile.model';
import {
  getClientProfile,
  getHistoryPhysicalDetails,
} from '@/app/profile/store/profile.selector';
import { Store } from '@ngrx/store';
import { AppState } from '@/app/store/app.state';
import { getClientHistoryPhysicalDetails } from '@/app/profile/store/profile.actions';

// install Swiper modules
SwiperCore.use([Pagination]);

@Component({
  selector: 'user-profile-history',
  templateUrl: './user-profile-history.component.html',
  styleUrls: ['./user-profile-history.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class UserProfileHistoryComponent implements OnInit, OnDestroy {
  historyPhysicalDetails$: Observable<ClientPhysicalDetails[] | null>;
  getClientProfileSub: Subscription;
  currentDay: number;
  currentMonth: number;
  currentYear: number;
  step = 0;
  config: SwiperOptions = {
    pagination: { clickable: true },
    scrollbar: { draggable: true },
  };

  constructor(private store: Store<AppState>) {}

  setStep(index: number) {
    this.step = index;
  }

  nextStep() {
    this.step++;
  }

  prevStep() {
    this.step--;
  }

  ngOnInit(): void {
    this.getClientProfileSub = this.store
      .select(getClientProfile)
      .subscribe((clientProfile) => {
        if (clientProfile && clientProfile.id) {
          this.store.dispatch(
            getClientHistoryPhysicalDetails({ clientId: clientProfile.id })
          );
        }
      });
    this.historyPhysicalDetails$ = this.store.select(getHistoryPhysicalDetails);
    this.historyPhysicalDetails$.subscribe((historyPhysicalDetails) => {
      console.log('historyPhysicalDetails', historyPhysicalDetails);
    });
  }
  ngOnDestroy() {
    if (this.getClientProfileSub) {
      this.getClientProfileSub.unsubscribe();
    }
  }
}
