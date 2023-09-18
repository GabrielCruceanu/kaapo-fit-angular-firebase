import {
  ApplicationRef,
  ChangeDetectionStrategy,
  Component,
  OnInit,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from './store/app.state';
import { SwUpdate } from '@angular/service-worker';
import { interval } from 'rxjs';
import { autoLogin } from '@/app/features/auth/store/auth.actions';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private store: Store<AppState>,
    private update: SwUpdate,
    private appRef: ApplicationRef
  ) {
    this.updateClient();
    this.checkUpdate();
  }

  ngOnInit() {
    this.store.dispatch(autoLogin());
    // this.store.dispatch(getUsersStart());
    // this.store.dispatch(getClientsStart());
    // this.store.dispatch(getGymsStart());
    // this.store.dispatch(getTrainersStart());
    // this.store.dispatch(getNutritionistsStart());
    // this.store.dispatch(getReviewsStart());
  }

  updateClient() {
    if (!this.update.isEnabled) {
      console.log('Not Enable');
      return;
    }
    this.update.available.subscribe((event) => {
      console.log(`current`, event.current, `available `, event.available);
      if (confirm('Modificari noi pentru aplicatie, confirma actualizarea.')) {
        this.update.activateUpdate().then(() => location.reload());
      }
    });

    this.update.activated.subscribe((event) => {
      console.log(`current`, event.previous, `available `, event.current);
    });
  }

  checkUpdate() {
    this.appRef.isStable.subscribe((isStable) => {
      if (isStable) {
        const timeInterval = interval(8 * 60 * 60 * 1000);

        timeInterval.subscribe(() => {
          this.update
            .checkForUpdate()
            .then((isNewUpdate) =>
              isNewUpdate ? this.updateClient() : console.log('checked')
            );
          console.log('update checked');
        });
      }
    });
  }
}
